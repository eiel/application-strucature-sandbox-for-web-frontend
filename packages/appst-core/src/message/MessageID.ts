/**
 * ミリ秒精度であればルーム内でユニークなはず
 * 制約として、ルーム内でメッセージは1ミリ秒につき一つしか作れない
 */
import { ToString } from "../ToString";

type MessageIDValue = number;
type RoomIDValue = number;

export interface MessageIDPair {
  value: MessageIDValue;
  // ミリ秒精度あればアプリケーション内で十分ユニークなはず
  // 以下の制約が生まれる: ルームは１ミリ秒につき一つしか作れない
  roomIDValue: RoomIDValue;
}

export interface MessageID extends MessageIDPair, ToString {}

const _toString = ({ value, roomIDValue }: MessageIDPair) =>
  `Message:${roomIDValue}:${value}`;

const _create = (pair: MessageIDPair): MessageID => {
  return {
    ...pair,
    toString: () => _toString(pair),
  };
};

const store = {};
const _createAndStore = (pair: MessageIDPair) => {
  const id = _create(pair);
  store[id.toString()] = _create(pair);
  return id;
};

export const MessageID = {
  for: (n: MessageIDPair): MessageID => {
    return store[_toString(n)] ?? _createAndStore(n);
  },
};
