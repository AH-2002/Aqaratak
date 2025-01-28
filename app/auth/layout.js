import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome styles

export default function AuthLayout({ children }) {
    return (
        <div className='authContainer' style={{height:'100vh', position:'relative', paddingTop:'30px'}}>
            {children}
            <div>
                <p style={{fontSize: '14px',position:'absolute',bottom:'50px',left:'50px'}}>
                    By proceeding, you agree to the
                    <span style={{ color: 'purple', cursor: 'pointer' }}> terms and conditions </span>
                    and
                    <span style={{ color: 'purple', cursor: 'pointer' }}> privacy policy</span>.
                </p>
            </div>
        </div>
    );
}