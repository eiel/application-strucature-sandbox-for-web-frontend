/**
 * ミリ秒精度であればルーム内でユニークなはず
 * 制約として、ルーム内でメッセージは1ミリ秒につき一つしか作れない
 */
import type { ToString } from "../ToString";

export interface MessageIDPair<MessageIDValue = number, RoomIDValue = number> {
  readonly value: MessageIDValue;
  // ミリ秒精度あればアプリケーション内で十分ユニークなはず
  // 以下の制約が生まれる: ルームは１ミリ秒につき一つしか作れない
  readonly roomIDValue: RoomIDValue;
}

export interface MessageID extends MessageIDPair, ToString {}

const _toString = ({ value, roomIDValue }: MessageIDPair): string =>
  `Message:${roomIDValue}:${value}`;

const _create = (pair: MessageIDPair): MessageID => {
  return {
    ...pair,
    toString(): string {
      return _toString(pair);
    },
  };
};

const store: Record<string, MessageID | undefined> = {};
const _createAndStore = (pair: MessageIDPair): MessageID => {
  const id = _create(pair);
  const key = id.toString();
  store[key] = _create(pair);
  return id;
};

export const messageIDModule = {
  for: (n: MessageIDPair): MessageID => {
    return store[_toString(n)] ?? _createAndStore(n);
  },
};
