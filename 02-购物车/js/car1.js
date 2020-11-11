$(function() {
    //1.全选全部选功能模块
    // 把全选按钮(check all)的状态赋值给三个小的按钮（j-checkbox）
    $(".checkall").change(function() {
        //console.log($(this).prop("checked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //让所有商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            //check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //2.如果复选框被选个数等于3 应该把全选选上  否则全选按钮不选
    $(".j-checkbox").change(function() {
        // if(被选中复选框个数 === 3){
        //     选全选按钮
        // }else{
        //     不选全选
        // }
        console.log($(".j-checkbox:checked"));
        // $(".j-checkbox").length这是所有复选框个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            //让所有商品添加check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            //check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //3.增减商品数量模块，首先声明变量，当点击加号让该值++，并赋值给文本框
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        //当前商品价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //当前商品价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);

        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    //4.用户修改文本框值
    $(".itxt").change(function() {
        //先得到文本框内值 ×单价
        var n = $(this).val();
        //当前商品单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    //5.总计总额
    getSum();

    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价钱

        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    //6.删除商品
    $(".p-action a").click(function() {
        //删除当前商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中商品
    $(".remove-batch").click(function() {
        //删除的是小复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });

});