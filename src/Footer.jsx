import styled from 'styled-components';
import VK from './vk.jpg';

const FootWrapper = styled.div`
    background-color: #a14242;
    padding: 20px;

`;

const FootHead = styled.p`
    font-size: 25px;
    color: white;
    margin-bottom: 10px;
`;

const FootLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 20px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;   
    }
`;

const Logo = styled.img`
    width: 40px;
    height: auto;
    border-radius: 15px;
`;

function Footer() {
    return (
        <FootWrapper id="contacts">
            <FootHead>Контакты</FootHead>
            <FootLink href="https://vk.ru/ninipai">
                <Logo src={VK} alt="Логотип ВКонтакте" />
                ВКонтакте
            </FootLink>
        </FootWrapper>
    );
}

export default Footer;