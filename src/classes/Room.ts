import * as crypto from "crypto";
import Player from "./Player";
import Movement from "./Movement";

export default class Room {
  code: string;
  firstPlayer: Player;
  secondPlayer?: Player;
  movements: Movement[];
  winner: Player;

  constructor({ code, firstPlayer }: { code: string; firstPlayer: Player }) {
    this.code = code;
    this.firstPlayer = firstPlayer;
  }

  static build({ firstPlayer }: { firstPlayer: Player }): Room {
    const code = this.buildRoomCode();
    return new Room({ firstPlayer, code });
  }

  private static buildRoomCode(): string {
    return crypto.randomBytes(6).toString("hex");
  }

  getWinner(): Player | null {
    const doesRoomHaveLessThanTwoPlayers =
      !this.firstPlayer || !this.secondPlayer;

    if (doesRoomHaveLessThanTwoPlayers) {
      return null;
    }

    const isFirstPlayerWinner = this.isPlayerWinner(this.firstPlayer);

    if (isFirstPlayerWinner) {
      return this.firstPlayer;
    }

    const isSecondPlayerWinner = this.isPlayerWinner(this.secondPlayer);

    if (isSecondPlayerWinner) {
      return this.secondPlayer;
    }

    return null;
  }

  private isPlayerWinner(player: Player): boolean {
    const didPlayerWinVertical =
      player.movements.every((movement) => [1, 4, 7].includes(movement)) ||
      player.movements.every((movement) => [2, 5, 8].includes(movement)) ||
      player.movements.every((movement) => [3, 6, 9].includes(movement));

    const didPlayerWinHorizontal =
      player.movements.every((movement) => [1, 2, 3].includes(movement)) ||
      player.movements.every((movement) => [4, 5, 6].includes(movement)) ||
      player.movements.every((movement) => [7, 8, 9].includes(movement));

    const didPlayerWinDiagonal =
      player.movements.every((movement) => [1, 5, 9].includes(movement)) ||
      player.movements.every((movement) => [3, 5, 7].includes(movement));

    const didPlayerWin =
      didPlayerWinVertical || didPlayerWinHorizontal || didPlayerWinDiagonal;

    return didPlayerWin;
  }
}
