import React from "react";
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div className="footer-middle">
                <div className="footer-links">
                    <a href="/" className="footer-link" onClick={(e) => e.preventDefault()}>이용약관</a>
                    <text className="footer-divider">|</text>
                    <a href="/" className="footer-link" onClick={(e) => e.preventDefault()}>개인정보처리방침</a>
                    <text className="footer-divider">|</text>
                    <a href="/" className="footer-link" onClick={(e) => e.preventDefault()}>채용정보</a>
                    <text className="footer-divider">|</text>
                    <a href="/" className="footer-link" onClick={(e) => e.preventDefault()}>전자금융거래약관</a>
                </div>
                <div className="footer-info">
                    <text className="footer-info-text">(주) 스터디허브</text>
                    <text className="footer-bottom-text">주소: 서울특별시 강남구 역삼대로 (KH정보교육원)</text>
                </div>
                <div className="footer-bottom">
                    <text className="footer-bottom-text">copyright StudyHub. All rights served.</text>
                    <text className="footer-bottom-text">모든 책임자 : 홍길동</text>
                    <text className="footer-bottom-text">tel : 010-1234-5678</text>
                </div>
            </div>
        </div>
    )
}

export default Footer;
