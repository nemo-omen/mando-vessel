import { socket } from '../socket.js';

export function saveGraphic(graphic) {
  socket.post('/graphics', graphic, (resData, jwRes) => {
    if (jwRes.statusCode !== 200) {
      return {ok: false}
    } else {
      return {ok: true}
    }
  });
}

export function deleteGraphic(id) {
  socket.delete(`/graphics/${id}`, (resDaya, jwRes) => {
    if (jwRes.statusCode !== 200) {
      return { ok: false }
    } else {
      return { ok: true }
    }
  });
}

export function updateGraphic(graphic) {
  socket.patch(`/graphics/${graphic.id}`, graphic, (resData, jwRes) => {
    if (jwRes.statusCode !== 200) {
      return {ok: false}
    } else {
      return {ok: true}
    }
  });
}

export function getAllGraphics() {
  socket.get('/graphics', (resData, jwRes) => {
    if (jwRes.statusCode !== 200) {
      return { ok: false };
    } else {
      return {ok: true, data: jwRes.body}
    }
  });
}

export function getGraphic(id) {
  {
    socket.get(`/graphics/${id}`, (resData, jwRes) => {
      if (jwRes.statusCode !== 200) {
        return {ok: false}
      } else {
        return {ok: true, data: jwRes.body}
      }
    });
}}
