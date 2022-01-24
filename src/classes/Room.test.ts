import Player from "./Player";
import Room from "./Room";

describe("Room", () => {
  it("creates a new room", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const room = Room.build({ firstPlayer });

    expect(room.code).toBeDefined();
    expect(room.firstPlayer).toBeDefined();
  });
});
