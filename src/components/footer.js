import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">© 2023 DevDashers, Inc</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-muted" href="#link"><svg className="bi" width="24" height="24"></svg></a></li>
                        <li className="ms-3"><a className="text-muted" href="#link"><svg className="bi" width="24" height="24"></svg></a></li>
                        <li className="ms-3"><a className="text-muted" href="#link"><svg className="bi" width="24" height="24"></svg></a></li>
                    </ul>
                </footer>
            </>
        )
    }
}

export default Footer;