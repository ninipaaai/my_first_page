import styled, { css } from 'styled-components';
import Schedule from './Schedule.jpg';

const Wrapper = styled.div`
    display:flow-root;
`;

const HeadProject = styled.h1`
    text-align:right;
    margin-right: 30px;
`;

const Text = styled.p`
    text-align:left;
    margin-left:10px;
`;

const Link = styled.a`
    color:#cf2323;
    text-decoration:underline;
`;

const List = styled.ul`
    text-align:left;
    list-style-type: disc;
    padding-left: 40px;       
`;

const Screenshot = styled.img`
    border-radius: 20px;
    width:1000px;
    margin: 0 auto;
    padding-bottom:10px;
`;


function MyProjects() {
    return(<>
    <Wrapper id="projects">
        <HeadProject href="#projects">Мои проекты</HeadProject>
        <Screenshot src={Schedule} alt="Фронтэнд нашего проекта"/>
        <Text>С поступлением на третий курс я стал выполнять ознакомительную практику. Я вместе с моим одногруппником Яуровым Глебом решили выбрать в качестве
        куратора <Link href="https://ciu.nstu.ru/kaf/persons/21874">Аврунёва Олега Евгеньевича</Link>. Он предложил нам интересную идею для проекта:
        составитель расписания для нашего университета. В основе этого веб-приложения лежит <i>solver</i>, который решает N-p сложную задачу, перебирая все возможные
        варианты построения расписания. Для хранения информации были созданы две базы данных: одна для хранения информации, а другая для общения с серверной частью.<br />
        <b>Стек инструментов</b>:
        </Text>
        <List>
            <li>React</li>
            <li>FastAPI</li>
            <li>PostgresSQL</li>
            <li>Redis</li>
            <li>Timefold</li>
            <li>Celery</li>
        </List>
        <Text><b>Языки программирования:</b></Text>
        <List>
            <li>JSX</li>
            <li>Python</li>
            <li>Java</li>
            <li>SQL</li>
        </List>
    </Wrapper>

    </>)
}

export default MyProjects;