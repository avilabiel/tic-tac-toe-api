import Player from "./Player";

describe("Player", () => {
  it("creates an user with empty movements", () => {
    const username = "newbie1234";

    const player = new Player({ username });

    expect(player.username).toBeDefined();
    expect(player.movements).toHaveLength(0);
  });

  it("saves movements from user", () => {
    const username = "newbie1234";
    const player = new Player({ username });

    const finalMovements = player.addMovement(1);

    expect(finalMovements).toHaveLength(1);
  });
});
