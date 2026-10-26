import { useState } from 'react';
import styled, { css } from 'styled-components';

/* Ссылки для навигации */
const NAV = [
  { href: '#about', label: 'Обо мне' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contacts', label: 'Контакты' },
];

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: #a14242;
  padding: 20px 20px;
`;

/* строка шапки: логотип слева, бургер справа */
const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  color: white;
  font-style:italic;
`;

const Burger = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 9px;
  border: 1px solid white;
  border-radius: 8px;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: white;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  /* когда меню открыто ($open = true) — полоски складываются в крестик */
  ${({ $open }) =>
    $open &&
    css`
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    `}
`;

const MenuBox = styled.nav`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 6px;
  padding-top: 12px;
`;

/* теперь это настоящая ссылка, а не div */
const HeadLink = styled.a`
  font-size: 18px;
  color: white;
  text-decoration: underline;
  font-style: italic;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <HeaderInner>
        <span>Обухов Назар</span>
        <Burger
          $open={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span /> {/*кнопка бургер*/}
          <span />
          <span />
        </Burger>
      </HeaderInner>

      <MenuBox $open={menuOpen}>
        {NAV.map((item) => (
          <HeadLink
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)} /* после перехода меню закрывается */
          >
            {item.label}
          </HeadLink>
        ))}
      </MenuBox>
    </HeaderWrapper>
  );
}

export default Header;