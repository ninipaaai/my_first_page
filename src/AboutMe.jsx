import styled, { css } from 'styled-components';
import MyPhoto from './MyPhoto.jpg';

const Wrapper = styled.div`
    display: flow-root;   
    border-bottom: 2px solid grey;
`;

const Text = styled.p`
    text-align:left;
    margin-right:5px;
`;

const Avatar = styled.img`
    border-radius: 20px;
    float:left;
    object-fit:cover;
    margin: 0 20px 15px 10px;
`;

function AboutMe() {
    return(<>
    <h1 id="about">Обо мне</h1>
    <Wrapper>
    <Avatar src={MyPhoto} alt='Моё фото' width={400} height={400}/>
    <Text>
        <b>Привет</b>, я Обухов Назар, студент НГТУ факультета прикладной математики и информатики. Недавно я и не мог подумать, что начну заниматься
        веб-программированием, а сейчас я сделал свой собственные сайт-визитку с помощью <b>React</b>. Свой путь в программировании я начала ещё в школе: я дополнительно
        занимался Python и участвовал в олимпиаде ВСОШ по информатике. Из увлечений я обожаю музыку, люблю слушать разные жанры, но, разумеется, мой любимый жанр - это <u>
        рок</u>. К слову, я играю на гитаре в рок-группе. Мы только начинаем свой путь и уже выпустили два сингла. Помимо этого последнее время я увлёкся туризмом. Я уже
        два раза ходил в поход на Алтае, и, я уверен, это далеко не последний. На этой странице вы можете найти интересующую Вас информацию обо мне.
    </Text>
    </Wrapper>
    </>);
}

export default AboutMe;