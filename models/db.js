const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Database connection configuration
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
		ca: `-----BEGIN CERTIFICATE-----
   MIIEQTCCAqmgAwIBAgIUaZfQ4jm7vxhrvWeP1M4ZZxgYYRowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjk1MzY1YTAtZDUwMi00ZTg0LTkwNzYtZWM1YjUxNzNi
MTkyIFByb2plY3QgQ0EwHhcNMjUwMTExMTMyNzAxWhcNMzUwMTA5MTMyNzAxWjA6
MTgwNgYDVQQDDC9iOTUzNjVhMC1kNTAyLTRlODQtOTA3Ni1lYzViNTE3M2IxOTIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMPpzj5h
mt8HRD8Td4RmdSE02gW3BrFU3I9eMlk3D0vcpHpU5n+33PuzUEhoI3K+MBbWOiR6
otZc2d2Iiw6GOjV4BXAtRcAFUjQw/09Zv1bJOJN+QLI87e1y3r4ST3QEEEVY6RmS
cQqFH+/ekPC9TVbs6qHqj2+2fCu0JNa8ZhnnnrpkdTeZuCViDJP5M4CwJohSyjqc
oI3Xb//odBVKaZov/6W32pHW8KAEriHsr7mfem66nogL+AdljQ8tw4e14nZTZZJH
LyjR+uWVOFKFRsCgsnuE52COZ97jBSoisLs+cXNmcGiUZ1LV+6aiHa2Yyy/Tg89F
HPEkOk70JXCo8z8nOBOWNbYAL7G/SltHPHYgBPI0xh6wvHX9LWDGWxBdjMh/o9V6
FlZPTdWL5CDYRrXggnK6AQMhs0ZK4wmcBuQZQl+LiuC6wlKnmpuWKWUkxxU7Q1Qq
KaqprO/zwcyf4nBHO0k1WhR63GwnkbfMdrUsqFrMVP+OLtX99MqoqBJpkQIDAQAB
oz8wPTAdBgNVHQ4EFgQU1nw5g+bYi6qrG6Jo75hVKob+UrcwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAG0lF16PXQG5KCTS
ktWtyLnG2JVcA31R8QSpcqjBd4WYTNOa6BgKsyYIf5m7V/dV3BmxYyoHSn1urplI
INt560BYspLLRdb/I+ZFfc+fLifT1zeuw+B7uZpGaPXDFVBaS9tvvxONlG8S7j8/
FO7LmUIWwlQNOya1sqWeBQFdDjqPVsTf/2kQDnUSjOITxnSFGdj8BvNoyh3C6dxe
fi7/y3fJE3uowGCKyPbv+PqeLUK8regYiNjBzBTuigyiQg5pRor/a2Szy7ocrbMm
VT4NTfz8tShZhawR+zKNnm1CbYHb9oSWAaOyBESJXnHtUJWUQTwAqk5xBY/l2tbb
5Gpnn5Zq1VcNI1MuHOv3QOnC8fZeLzl8tbIE0sPO78cfZj88ttbvFJYs4xxggyP3
IbVLDT324Qcta+zML5mlHegMIWDmJ2F8nQ40pWKoql01iBVQbig6hOB7lojnYCsH
t4Vlv4+sSeHBDa1uLXaGbE4RJakC+wl3LdNlzvlbpN5hLCyDsQ==
    ...
    -----END CERTIFICATE-----`,
	},
});

module.exports = pool;
