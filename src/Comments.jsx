import { useEffect, useState } from 'react';
import styled from 'styled-components';

// ---------------------------------------------------------------------------
// Стили — в том же стиле, что и остальные секции сайта
// ---------------------------------------------------------------------------
const Wrapper = styled.div`
    display: flow-root;
    padding-bottom: 20px;
`;

const CommentList = styled.ul`
    text-align: left;
    margin: 10px 30px 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const CommentItem = styled.li`
    background: #f7f2f2;
    border-left: 4px solid #a14242;
    border-radius: 8px;
    padding: 12px 16px;
`;

const CommentHead = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
`;

const CommentAuthor = styled.b`
    color: #a14242;
`;

const CommentDate = styled.span`
    color: #888;
    font-size: 14px;
`;

const CommentText = styled.p`
    margin-top: 4px;
    white-space: pre-wrap; /* сохраняем переносы строк из комментария */
`;

/* правая часть шапки карточки: дата + кнопка удаления */
const HeadRight = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #b3a1a1;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    padding: 2px 7px;
    border-radius: 6px;

    &:hover {
        color: #cf2323;
        background: #efe3e3;
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const Form = styled.form`
    margin: 20px 30px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 640px;
    text-align: left;
`;

const Input = styled.input`
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;

    &:focus {
        outline: 2px solid #a14242;
        border-color: transparent;
    }
`;

const Textarea = styled.textarea`
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    min-height: 90px;
    resize: vertical;

    &:focus {
        outline: 2px solid #a14242;
        border-color: transparent;
    }
`;

const Button = styled.button`
    align-self: flex-start;
    padding: 10px 28px;
    background: #a14242;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover { background: #8f3737; }
    &:disabled { opacity: 0.6; cursor: default; }
`;

const Status = styled.p`
    margin: 10px 30px 0;
    text-align: left;
    color: #666;
`;

const ErrorText = styled(Status)`
    color: #cf2323;
`;

// ---------------------------------------------------------------------------
// Компонент «Комментарии»
//
// Здесь живёт ответ на вопрос «как соединить фронтенд и бэкенд»:
// браузер делает HTTP-запросы функцией fetch() на адреса бэкенда,
// а бэкенд отвечает JSON'ом. Всё общение идёт асинхронно (async/await),
// поэтому на время запроса показываем пользователю статус.
// ---------------------------------------------------------------------------
function Comments() {
    const [comments, setComments] = useState([]);  // список с сервера
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null); // id комментария, который сейчас удаляем

    // useEffect с пустым массивом зависимостей [] выполнится ОДИН раз
    // после первой отрисовки компонента — загружаем комментарии с сервера
    useEffect(() => {
        loadComments();
    }, []);

    async function loadComments() {
        setLoading(true);
        setError('');
        try {
            // GET /api/comments. Адрес относительный, а не http://localhost:8000,
            // потому что в dev-режиме запрос проксирует Vite (см. vite.config.js),
            // а после сборки сайт вообще отдаёт сам FastAPI — origin совпадает.
            const response = await fetch('/api/comments');
            if (!response.ok) {
                throw new Error(`Сервер вернул ${response.status}`);
            }
            // response.json() тоже асинхронный — он читает тело ответа
            const data = await response.json();
            setComments(data);
        } catch (err) {
            // Сюда попадём, если бэкенд не запущен или вернул ошибку
            setError('Не удалось загрузить комментарии: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault(); // отменяем перезагрузку страницы при отправке формы
        if (!name.trim() || !text.trim()) return;

        setSending(true);
        setError('');
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body не может быть объектом JS — только строка,
                // поэтому сериализуем через JSON.stringify
                body: JSON.stringify({ name: name.trim(), text: text.trim() }),
            });
            if (!response.ok) {
                throw new Error(`Сервер вернул ${response.status}`);
            }
            const savedComment = await response.json();
            // Добавляем сохранённый комментарий в список без перезагрузки
            setComments([savedComment, ...comments]);
            setName('');
            setText('');
        } catch (err) {
            setError('Не удалось отправить комментарий: ' + err.message);
        } finally {
            setSending(false);
        }
    }

    // Удаление комментария — работает с твоим эндпоинтом DELETE /api/comments/{id}
    async function handleDelete(id) {
        // window.confirm показывает браузерный диалог «ОК / Отмена».
        // Если пользователь нажал «Отмена» — просто выходим, ничего не удаляем.
        if (!window.confirm('Удалить этот комментарий?')) return;

        setDeletingId(id);
        setError('');
        try {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Сервер вернул ${response.status}`);
            }
            // Твой бэкенд отвечает 204 — тело ответа пустое,
            // поэтому response.json() здесь вызывать не нужно.
            // Убираем комментарий из локального состояния —
            // React перерисует список и карточка исчезнет сама.
            setComments(comments.filter((c) => c.id !== id));
        } catch (err) {
            setError('Не удалось удалить комментарий: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    }

    function formatDate(isoString) {
        // Нюанс твоего бэкенда: SQLAlchemy-функция now() кладёт в базу время в UTC,
        // и строка приходит без часового пояса: "2026-11-09T04:46:34".
        // Если пометить её суффиксом 'Z' (стандартный маркер UTC в ISO-8601),
        // браузер сам переведёт время в пояс посетителя при выводе
        // через toLocaleString — для Новосибирска это будет +7 часов.
        if (!isoString.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(isoString)) {
            isoString += 'Z';
        }
        return new Date(isoString).toLocaleString('ru-RU', {
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
        });
    }

    return (
        <Wrapper id="comments">
            <h1>Комментарии</h1>

            {loading && <Status>Загружаем комментарии…</Status>}
            {error && <ErrorText>{error}</ErrorText>}

            {!loading && !error && comments.length === 0 && (
                <Status>Пока никто не оставил комментарий. Будь первым!</Status>
            )}

            <CommentList>
                {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                        <CommentHead>
                            <CommentAuthor>{comment.name}</CommentAuthor>
                            <HeadRight>
                                <CommentDate>{formatDate(comment.created_at)}</CommentDate>
                                <DeleteButton
                                    title="Удалить комментарий"
                                    disabled={deletingId !== null}
                                    onClick={() => handleDelete(comment.id)}
                                >
                                    ×
                                </DeleteButton>
                            </HeadRight>
                        </CommentHead>
                        <CommentText>{comment.text}</CommentText>
                    </CommentItem>
                ))}
            </CommentList>

            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Твоё имя"
                    value={name}
                    maxLength={60}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="Текст комментария"
                    value={text}
                    maxLength={1000}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit" disabled={sending || !name.trim() || !text.trim()}>
                    {sending ? 'Отправляем…' : 'Отправить'}
                </Button>
            </Form>
        </Wrapper>
    );
}

export default Comments;
