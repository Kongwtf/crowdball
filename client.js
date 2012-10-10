// xmpp info
// NOTE: if you aren't using an @talkto.com JID, the BOSH_SERVER will need to be changed
var BOSH_SERVER = "http://talkto.com:5280/http-bind";
var JID = "someone@talkto.com";
var PASS = "password";
var conn = null;

// keyboard codes
var KEY_H = 72;
var KEY_J = 74;
var KEY_K = 75;
var KEY_L = 76;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_P = 80;
var KEY_N = 78;
var KEY_B = 66;
var KEY_F = 70;

$(function() {
    $(document).on("keydown", function(ev) {
        var name = "";
        var keycode = ev.keyCode;
        if (keycode === KEY_K ||
            keycode === KEY_UP ||
            (ev.ctrlKey && keycode === KEY_P)) {
            name = "up";
        } else if (keycode === KEY_J ||
            keycode === KEY_DOWN ||
            (ev.ctrlKey && keycode === KEY_N)) {
            name = "down";
        } else if (keycode === KEY_H ||
            keycode === KEY_LEFT ||
            (ev.ctrlKey && keycode === KEY_B)) {
            name = "left";
        } else if (keycode === KEY_L ||
            keycode === KEY_RIGHT ||
            (ev.ctrlKey && keycode === KEY_F)) {
            name = "right";
        }

        $("button[name=" + name + "]").click();
    });

    $("button").on("click", function() {
        var msg = $msg({to: JID + "/server", type: "chat"})
            .c("body").t($(this).attr("name"));
        conn.send(msg);
    });

    conn = new Strophe.Connection(BOSH_SERVER);

    conn.connect(JID + "/client", PASS, function(status) {
        if (status == Strophe.Status.CONNECTED) {
            show("CONNECTED!");
        } else if (status == Strophe.Status.DISCONNECTED) {
            show("DISCONNECTED!");
        }
    });
});
