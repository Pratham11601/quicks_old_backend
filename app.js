const express = require('express');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));


app.use(bodyParser.json({ limit: '50mb' }));

const allowedOrigins = [
    'https://quickcabpune.com/',
    'https://quickcabpune.com/app/',
    'https://quickcabadmin.co.in/'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

global.__basedir = __dirname;

app.use(express.json());
app.use(express.static(path.join(__basedir, 'uploads')));
app.use('/uploads', express.static(path.join(__basedir, 'uploads')));
app.use('/documents', express.static(path.join(__basedir, 'documents')));

const postRoute = require('./routes/post');
const vendorDetailsRoute = require('./routes/vendorsDetails');
const help_supportRoute = require('./routes/help_support');
const advertiseRouter = require('./routes/advertise');
const cityRoutes = require('./routes/cities_route'); // Adjust the path
const catRoutes = require('./routes/category_routes');
const subscriptions = require('./routes/subsription');
const rzp_key = require('./routes/rzp_key_routes');
const authRouter = require('./routes/otpless_integration');
const sub_packages = require('./routes/sub_packages');

app.use('/leads', postRoute);
app.use('/vendorDetails', vendorDetailsRoute);
app.use('/help_support', help_supportRoute);
app.use('/advertise', advertiseRouter); 
app.use('/cities', cityRoutes);
app.use('/categories', catRoutes); 
app.use('/subscriptions', subscriptions);
app.use('/rzp_key', rzp_key);
app.use('/auth', authRouter);
app.use('/sub_packages', sub_packages);

console.log("app ");

app.listen(1840, () => {
    console.log(`Server running on port ${1840}`);
});

module.exports = app;

