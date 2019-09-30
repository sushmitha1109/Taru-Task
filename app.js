$(document).ready(function(){
    var newRowId=2,previousRowId;
    var productQty,productPrice;
    var productTotalAmt;

    $(".addRow").click(function(){
        previousRowId=newRowId-1;
        $('#tableRow'+newRowId).addClass("inputRow");
        $('#tableRow'+newRowId).html($('#tableRow'+previousRowId).html()).find("td:first-child input").val(newRowId);
        $('#tableRow'+newRowId).find("td:first-child span").html(newRowId);
        $('.tableProduct').append('<tr id="tableRow'+(newRowId+1)+'"></tr>'); //creating Dummy Row
          newRowId++;
        
    });

    $(".tableProduct").on('click', '.deleteRow', function () {
        if(newRowId>2){
            $(this).closest('tr').remove();
            var rowId=0;
            $("tr").each(function(){
                $(this).attr("id","tableRow"+rowId).find("td:first-child").html(rowId);
                // $(this).find("td:first-child").html(rowId);
            rowId++;
            //    newRowId=rowId;
            });
            newRowId=$('.tableProduct tbody tr').length;
            grandTotal();
        }
        
    });
    $('.tableProduct').on('keyup', 'input', function(){
        var currentRow=$(this).closest('tr');
        var productQty=$(currentRow).find(".productQty").val();
         var productPrice=$(currentRow).closest('tr').find(".productPrice").val();
         $(this).closest('tr').find(".totalAmt").val(productQty*productPrice);
        grandTotal();
    });

    $('.taxPercentage').keyup(function(){
        grandTotal();
    });
    
    function grandTotal(){
    var subTotal=0;
    $(".totalAmt").each(function(){
        subTotal+=parseInt($(this).val());
    });
    $("#subTotal").val(subTotal);
    var taxPercentage=$('.taxPercentage').val();
    // alert(taxPercentage);
    var taxAmount=(subTotal/100)*taxPercentage;
    // alert(taxAmount);
    // alert(taxAmount+10);
    $('.taxAmt').val(taxAmount);
    // console.log(parseInt(s)+10);
    $('.grandTotal').val((taxAmount+subTotal));
    }

    $(".jsonBtn").click(function(){
        var data= {product_data:[],custom_details:[],summary:[]};
        var form_obj={};
        var total_obj={};
        var th_productVal=[];
        var td_productVal,td_totalValue;
        //PRODUCT DATA HEAD
        $(".tableProduct .input_head").each(function(index){
            th_productVal[index]=$(this).text();
            // alert($(this).text());
        });
        //CUSTOMER 
        $('form .inputData').each(function(){
            form_obj[$(this).attr('name')]=$(this).val();
        });
        // $("form").find('inputData').each(function(){
        //     form_obj[$(this).attr('name')]=$(this).val();
        // });
        data.custom_details.push(form_obj);
        //PRODUCT DATA
        $('.tableProduct tbody .inputRow').each(function(){
            var product_obj = {};
            $(this).find('.inputData').each(function(index){
                // console.log($(this).val());
                product_obj[th_productVal[index]]=$(this).val();
            });
            data.product_data.push(product_obj);
        });
        //TOTAL AMOUNT
        $('.tableTotal tbody tr td input').each(function(){
            // th_totalValue=$(this).find('th').text();
                total_obj[$(this).attr('name')]=$(this).val();
                // alert($(this).attr('name'));
        });
        data.summary.push(total_obj);
        console.log(JSON.parse(JSON.stringify(data)));
        
    });
});