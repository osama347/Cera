require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at ${uploadsDir}`);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${req.body.transactionId}-${Date.now()}${path.extname(file.originalname)}`;
    console.log(`Saving file as: ${uniqueSuffix}`);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('image');

const uploadPayment = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('receipt');

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));
console.log('CORS middleware applied for origin: http://localhost:5173');
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Debug middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas and Models
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});
const User = mongoose.model('User', userSchema);

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General' },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.model('Blog', blogSchema);

const PaymentSchema = new mongoose.Schema({
  userInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  cartItems: [{
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }],
  transactionId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Payment Verified', 'Rejected'] },
  receiptImage: { type: String },
  receiptPdf: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Payment = mongoose.model('Payment', PaymentSchema);

// JWT Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token received:', token);
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log('Verified user:', verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Admin-only Middleware
const requireAdmin = (req, res, next) => {
  console.log('User role:', req.user.role);
  if (req.user.role !== 'admin') {
    console.log('Admin access denied for user:', req.user.username);
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Function to generate receipt PDF
const generateReceiptPDF = (payment) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const pdfFileName = `receipt_${payment.transactionId}.pdf`;
    const pdfPath = path.join(uploadsDir, pdfFileName);
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // ===== HEADER =====
    doc.font('Helvetica-Bold')
      .fontSize(20)
      .fillColor('#2E86C1')
      .text('PAYMENT RECEIPT', { align: 'center' });

    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(11).fillColor('black');
    doc.text(`Receipt ID: ${payment._id || 'N/A'}`, { align: 'center' });
    doc.text(`Date: ${new Date(payment.createdAt || Date.now()).toLocaleString()}`, { align: 'center' });
    doc.text(`Transaction ID: ${payment.transactionId.slice(0, 6)}`, { align: 'center' });

    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Divider
    doc.moveDown(1.5);

    // ===== COMPANY INFO =====
// ===== COMPANY INFO =====
doc.font('Helvetica-Bold').fontSize(14).fillColor('black')
   .text('Company Information', 50, doc.y);   // force X=50

doc.font('Helvetica').fontSize(11);
doc.text(`${process.env.COMPANY_NAME || 'Your Company Name'}`, 50, doc.y);
doc.text(`${process.env.COMPANY_ADDRESS || '123 Business Avenue, City, Country'}`, 50, doc.y);
doc.text(`Email: ${process.env.COMPANY_EMAIL || 'info@yourcompany.com'}`, 50, doc.y);
doc.text(`Phone: ${process.env.COMPANY_PHONE || '+123-456-7890'}`, 50, doc.y);
doc.moveDown(1);

// ===== CUSTOMER INFO =====
doc.font('Helvetica-Bold').fontSize(14).text('Customer Information', 50, doc.y);
doc.font('Helvetica').fontSize(11);
doc.text(`Name: ${payment.userInfo?.fullName || 'N/A'}`, 50, doc.y);
doc.text(`Email: ${payment.userInfo?.email || 'N/A'}`, 50, doc.y);
doc.text(`Phone: ${payment.userInfo?.phone || 'N/A'}`, 50, doc.y);
doc.text(`Address: ${payment.userInfo?.address || 'N/A'}`, 50, doc.y);
doc.text(`Payment Method: ${payment.paymentMethod || 'N/A'}`, 50, doc.y);
doc.moveDown(1);


    // ===== ORDER DETAILS =====
    doc.font('Helvetica-Bold').fontSize(14).text('Order Details', { align: 'left' });
    doc.moveDown(0.5);

    if (payment.cartItems && payment.cartItems.length > 0) {
      const col1X = 50, col2X = 250, col3X = 350, col4X = 450;
      const colWidth1 = 200, colWidth2 = 100, colWidth3 = 100, colWidth4 = 100;

      // Table Header
      doc.font('Helvetica-Bold').fontSize(12);
      const headerY = doc.y;
      doc.text('Item', col1X, headerY, { width: colWidth1, align: 'left' });
      doc.text('Price', col2X, headerY, { width: colWidth2, align: 'right' });
      doc.text('Quantity', col3X, headerY, { width: colWidth3, align: 'right' });
      doc.text('Subtotal', col4X, headerY, { width: colWidth4, align: 'right' });

      doc.moveDown(0.2);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // Table Rows
      doc.font('Helvetica').fontSize(11);
      let total = 0;
      payment.cartItems.forEach((item) => {
        const subtotal = (item.price || 0) * (item.quantity || 0);
        total += subtotal;
        const rowY = doc.y;
        doc.text(item.title || 'N/A', col1X, rowY, { width: colWidth1, align: 'left' });
        doc.text(`Rs. ${(item.price || 0).toFixed(2)}`, col2X, rowY, { width: colWidth2, align: 'right' });
        doc.text((item.quantity || 0).toString(), col3X, rowY, { width: colWidth3, align: 'right' });
        doc.text(`Rs. ${subtotal.toFixed(2)}`, col4X, rowY, { width: colWidth4, align: 'right' });
        doc.moveDown(0.4);
      });

      // Divider
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // Total Row
      doc.font('Helvetica-Bold').fontSize(12);
      doc.text('Total:', col3X, doc.y, { width: colWidth3, align: 'right' });
      doc.text(`Rs. ${total.toFixed(2)}`, col4X, doc.y, { width: colWidth4, align: 'right' });
      doc.moveDown(1);
    } else {
      doc.font('Helvetica').fontSize(11).text('No items provided', 50, doc.y);
      doc.moveDown(1);
    }

// ===== RETURN POLICY =====
doc.font('Helvetica-Bold').fontSize(14).text('Return Policy', 50, doc.y);
doc.font('Helvetica').fontSize(11);
doc.list([
  'Item is damaged.',
  'Product is expired.',
  'Delivery box is broken.',
  'You received a different product.',
  'You do not like the product.'
], 70, doc.y, { bulletRadius: 2 }); // indent list a little

doc.moveDown(0.5);
doc.text('For return/refund inquiries, contact us at ' + (process.env.COMPANY_EMAIL || 'info@yourcompany.com') + '.', 50, doc.y);

    // ===== FOOTER =====
    doc.moveDown(2);
    doc.font('Helvetica').fontSize(10).fillColor('gray');
    doc.text('Thank you for your purchase!', { align: 'center' });
    doc.text(`For any inquiries, contact us at ${process.env.COMPANY_EMAIL || 'info@yourcompany.com'}`, { align: 'center' });

    doc.end();

    stream.on('finish', () => {
      console.log(`PDF generated: ${pdfPath}`);
      resolve(`/Uploads/${pdfFileName}`);
    });
    stream.on('error', (err) => {
      console.error(`PDF generation error: ${err.message}`);
      reject(err);
    });
  });
};


// Test email route for debugging
app.get('/api/test-email', async (req, res) => {
  const testMailOptions = {
    from: `"cera medical" <${process.env.SMTP_USER}>`,
    to: 'itxmeatif8@gmail.com',
    subject: 'Test Email from Cera Medical',
    text: 'This is a test email from your server.',
  };
  transporter.sendMail(testMailOptions, (error, info) => {
    if (error) {
      console.error('Test email error:', error);
      return res.status(500).json({ message: 'Email failed: ' + error.message });
    }
    console.log('Test email sent: ' + info.response);
    res.json({ message: 'Test email sent successfully' });
  });
});

// Routes
app.post('/api/auth/login', async (req, res) => {
  console.log('Received login request:', req.body);
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Product Routes
app.post('/api/products', authenticateJWT, requireAdmin, upload, handleMulterError, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Title, description, and price are required' });
    }
    const product = new Product({
      title,
      description,
      price: parseFloat(price),
      image: req.file ? `/Uploads/${req.file.filename}` : null,
    });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error('Add product error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.put('/api/products/:id', authenticateJWT, requireAdmin, upload, handleMulterError, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Title, description, and price are required' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price: parseFloat(price),
        image: req.file ? `/Uploads/${req.file.filename}` : req.body.image,
      },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

app.delete('/api/products/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Blog Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Get blogs error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error('Get blog error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.post('/api/blogs', authenticateJWT, requireAdmin, upload, handleMulterError, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const blog = new Blog({
      title,
      content,
      category: category || 'General',
      image: req.file ? `/Uploads/${req.file.filename}` : null,
    });
    await blog.save();
    res.status(201).json({ message: 'Blog added successfully', blog });
  } catch (err) {
    console.error('Add blog error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

app.put('/api/blogs/:id', authenticateJWT, requireAdmin, upload, handleMulterError, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category: category || 'General',
        image: req.file ? `/Uploads/${req.file.filename}` : req.body.image,
      },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

app.delete('/api/blogs/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Payment Routes
app.post('/api/payments', uploadPayment, handleMulterError, async (req, res) => {
  try {
    const { userInfo, cartItems, transactionId, paymentMethod } = req.body;
    if (!userInfo || !cartItems || !transactionId || !paymentMethod) {
      return res.status(400).json({ message: 'User info, cart items, transaction ID, and payment method are required' });
    }

    const parsedUserInfo = JSON.parse(userInfo);
    const parsedCartItems = JSON.parse(cartItems);

    if (!Array.isArray(parsedCartItems) || parsedCartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items must be a non-empty array' });
    }

    const isValidCartItems = parsedCartItems.every(
      (item) => item.title && typeof item.price === 'number' && typeof item.quantity === 'number'
    );
    if (!isValidCartItems) {
      return res.status(400).json({ message: 'Each cart item must have a title, price, and quantity' });
    }

    let receiptImagePath = null;
    if (req.file) {
      const thumbnailPath = path.join(uploadsDir, `thumbnail_${req.file.filename}`);
      await sharp(req.file.path)
        .resize({ width: 200, height: 300, fit: 'contain' })
        .toFile(thumbnailPath);
      receiptImagePath = `/Uploads/thumbnail_${req.file.filename}`;
    }

    const payment = new Payment({
      userInfo: parsedUserInfo,
      cartItems: parsedCartItems,
      transactionId,
      paymentMethod,
      receiptImage: receiptImagePath,
      status: 'Pending',
    });

    const pdfPath = await generateReceiptPDF(payment);
    payment.receiptPdf = pdfPath;
    await payment.save();

    // Admin email
    const adminMailOptions = {
      from: `"cera medical" <${process.env.SMTP_USER}>`,
      to: 'medicalcera@gmail.com',
      subject: `New Payment Submission from ${payment.userInfo.fullName}`,
      html: `
        <h2>New Payment Submission</h2>
        <p>A new payment has been submitted by <strong>${payment.userInfo.fullName}</strong>.</p>
        <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
        <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li>Name: ${payment.userInfo.fullName}</li>
          <li>Email: ${payment.userInfo.email}</li>
          <li>Phone: ${payment.userInfo.phone}</li>
          <li>Address: ${payment.userInfo.address}</li>
        </ul>
        <p><strong>Items:</strong></p>
        <ul>
          ${payment.cartItems.map(item => `<li>${item.title} - Rs. ${item.price.toFixed(2)} x ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> Rs. ${payment.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        ${payment.receiptImage ? `<p><a href="http://localhost:5000${payment.receiptImage}">View Transaction Image</a></p>` : '<p>No transaction image provided</p>'}
        <p><a href="http://localhost:5000${payment.receiptPdf}">View Receipt PDF</a></p>
        <p>Please verify the payment in the admin dashboard and arrange for delivery.</p>
      `,
    };
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error('Admin email error:', error);
      } else {
        console.log('Admin email sent: ' + info.response);
      }
    });

    // Customer email
    const customerMailOptions = {
      from: `"cera medical" <${process.env.SMTP_USER}>`,
      to: payment.userInfo.email,
      subject: 'Your Order Has Been Submitted',
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${payment.userInfo.fullName},</p>
        <p>Your order with Transaction ID <strong>${payment.transactionId}</strong> has been submitted successfully.</p>
        <p>We are awaiting verification. You will receive another email once your payment is verified.</p>
        <p><a href="http://localhost:5000${payment.receiptPdf}">Download Your Receipt</a></p>
        <p>Thank you for shopping with cera medical!</p>
      `,
    };
    transporter.sendMail(customerMailOptions, (error, info) => {
      if (error) {
        console.error('Customer email error:', error);
      } else {
        console.log('Customer email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Payment submitted successfully', payment });
  } catch (err) {
    console.error('Add payment error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/payments', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    console.log('Fetched payments:', payments.map(p => ({ _id: p._id, transactionId: p.transactionId, receiptImage: p.receiptImage, receiptPdf: p.receiptPdf })));
    res.json(payments);
  } catch (err) {
    console.error('Get payments error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    console.error('Get payment error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.put('/api/payments/:id/status', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['Pending', 'Payment Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    if (status === 'Payment Verified' || status === 'Rejected') {
      const mailOptions = {
        from: `"cera medical" <${process.env.SMTP_USER}>`,
        to: payment.userInfo.email,
        subject: `Payment ${status === 'Payment Verified' ? 'Verified' : 'Rejected'}`,
        html: `
          <h2>Payment Status Update</h2>
          <p>Dear ${payment.userInfo.fullName},</p>
          <p>Your payment with Transaction ID <strong>${payment.transactionId}</strong> has been <strong>${status}</strong>.</p>
          ${status === 'Payment Verified' ? `
            <p>We will contact you shortly to arrange delivery.</p>
            <p><a href="http://localhost:5000${payment.receiptPdf}">Download Your Receipt</a></p>
          ` : `
            <p>Please contact us at ${process.env.COMPANY_EMAIL || 'info@yourcompany.com'} for further assistance.</p>
          `}
          <p>Thank you for shopping with us!</p>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error:', error);
        } else {
          console.log('User notification email sent: ' + info.response);
        }
      });
    }

    res.json({ message: 'Payment status updated successfully', payment });
  } catch (err) {
    console.error('Update payment error:', err);
    res.status(400).json({ message: 'Server error: ' + err.message });
  }
});

// Command-line Password Setter
if (process.argv[2] === 'setpassword') {
  const username = process.argv[3];
  const password = [process.argv[4]];
  if (!username || !password) {
    console.log('Usage: node server.js setpassword <username> <password>');
    process.exit(1);
  }
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err);
      process.exit(1);
    }
    try {
      await mongoose.connect(process.env.MONGO_URI);
      const user = await User.findOneAndUpdate(
        { username },
        { username, password: hashedPassword, role: 'admin' },
        { upsert: true, new: true }
      );
      console.log(`Admin password set for user: ${user.username} with role: ${user.role}`);
      process.exit(0);
    } catch (err) {
      console.error('Error setting password:', err);
      process.exit(1);
    }
  });
} else {
  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}