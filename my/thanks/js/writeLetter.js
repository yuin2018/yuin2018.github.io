var name, nameTwo, inscribe;

$(".btn").click(function () {
    name = $("input.name").val();
    nameTwo = $("input.name-two").val();
    inscribe = $("input.inscribe").val();
    if (checkInput()) {
        $(".prompt").show();
    } else if (name.length < 1 || name.length > 7) {
        alert("请输入正确昵称")
        $("input.name").focus()
    } else if (nameTwo.length < 1 || nameTwo.length > 7) {
        alert("请输入正确昵称");
        $("input.name-two").focus()
    } else {
        alert("请输入正确落款")
        $("input.inscribe").focus()
    }
})

function checkInput() {
    for (var i = 0; i < $("input").length; i++) {
        if ($("input")[i].value.length = 0 || $("input")[i].value.length > 7) return false
    }
}

$(".cancel").click(function () {
    $(".prompt").hide();
})

// 点击确认按钮
$(".btn-confirm").click(function () {
    $(".prompt").hide();
    $(".share-prompt").show();
})
$(".btn-alter").click(function () {
    $(".prompt").hide();
})
$(".share-prompt").click(function () {
    $(".share-prompt").hide();
})