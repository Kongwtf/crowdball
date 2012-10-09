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

$(function() {
    $("button").on("click", function() {
        var msg = $msg({to: JID + "/server", type: "chat"})
            .c("body").t($(this).attr("name"));
        conn.send(msg);
    });

    $(document).on("keydown", function(ev) {
        var name = "";
        switch (ev.keyCode) {
        case KEY_H:
        case KEY_LEFT:
            name = "left";
            break;
        case KEY_L:
        case KEY_RIGHT:
            name = "right";
            break;
        case KEY_J:
        case KEY_DOWN:
            name = "down";
            break;
        case KEY_K:
        case KEY_UP:
            name = "up";
            break;
        default:
            break;
        }

        $("button[name=" + name + "]").click();
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
