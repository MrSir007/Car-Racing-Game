class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data)=>{
      playerCount = data.val()
    });
  }
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance
    });
  }
  static getInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data)=>{
      allPlayers = data.val()
    });
  }
  win() {
    database.ref("rank").on("value",(data)=>{
      this.rank = data.val()
    });
  }
  static stop(r) {
    database.ref("/").update({
      rank: r
    });
  }
}