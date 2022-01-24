import MemoryStorage from "./MemoryStorage";
import Player from "./Player";
import Room from "./Room";

describe("MemoryStorage", () => {
  beforeEach(() => {
    MemoryStorage.getOrBuild().cleanRooms();
  });

  it("stores a new value", () => {
    const roomToStore: Room = {
      code: "XYZABCD29",
      firstPlayer: new Player({ username: "newbie" }),
      secondPlayer: new Player({ username: "master" }),
      movements: [],
      winner: null,
    };
    const memoryStorage = MemoryStorage.getOrBuild();

    const roomId = memoryStorage.storeRoom(roomToStore);

    expect(roomId).toBeDefined();
    expect(roomId).toBeGreaterThan(-1);
  });

  it("finds a room by its code", () => {
    const roomToStore: Room = {
      code: "XYZABCD29",
      firstPlayer: new Player({ username: "newbie" }),
      secondPlayer: new Player({ username: "master" }),
      movements: [],
      winner: null,
    };
    const memoryStorage = MemoryStorage.getOrBuild();
    memoryStorage.storeRoom(roomToStore);

    const persistedRoom = memoryStorage.findRoomByCode(roomToStore.code);

    expect(persistedRoom).toBeDefined();
  });

  it("throws an error when room.url already exists on storage", () => {
    const roomToStore: Room = {
      code: "XYZABCD29",
      firstPlayer: new Player({ username: "newbie" }),
      secondPlayer: new Player({ username: "master" }),
      movements: [],
      winner: null,
    };
    const memoryStorage = MemoryStorage.getOrBuild();
    memoryStorage.storeRoom(roomToStore);

    try {
      const roomId = memoryStorage.storeRoom(roomToStore);
    } catch (error) {
      expect(error.message).toEqual("Room URL already exists");
    }
  });
});
