// xmpp info
// NOTE: if you aren't using an @talkto.com JID, the BOSH_SERVER will need to be changed
var BOSH_SERVER = "http://talkto.com:5280/http-bind";
var JID = "someone@talkto.com";
var PASS = "password";
var conn = null;

function show(message) {
    $("#msg").html(message);
    setTimeout(function() {
        $("#msg").fadeOut(1000);
    }, 2500);
}

function handle_msg(msg) {
    var text = $(msg).find("body").text();

    var moves = {"left": {dx: -MOVE_DIST, dy: 0},
                 "right": {dx: MOVE_DIST, dy: 0},
                 "up": {dx: 0, dy: -MOVE_DIST},
                 "down": {dx: 0, dy: MOVE_DIST},
                 "none": {dx: 0, dy: 0}};

    var move = moves[text] || moves["none"];
    moveBall(move.dx, move.dy);

    return true;
}

$(function() {
    var board = $("#board").get(0);
    ctx = board.getContext("2d");
    drawBoard();

    conn = new Strophe.Connection(BOSH_SERVER);

    conn.connect(JID + "/server", PASS, function(status) {
        if (status == Strophe.Status.CONNECTED) {
            show("CONNECTED!");

            conn.addHandler(handle_msg, null, "message");

            conn.send($pres());
        } else if (status == Strophe.Status.DISCONNECTED) {
            show("DISCONNECTED!");
        }
    });
});
