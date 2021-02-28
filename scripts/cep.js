$(document).ready(function () {

    $('#meucep').focus();

    $('#meucep').focusout(function () {

        var cep = $('#meucep').val();

        //Nova variável "cep" somente com dígitos.
        cep = cep.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {


                var urlStr = "https://viacep.com.br/ws/" + cep + "/json";

                $.ajax({

                    url: urlStr,
                    type: "get",
                    dataType: "jsonp", // o JSONP  evita o erro do CORS.

                    headers: {
                        'X-Requested-With': 'XMLHttpRequest', // correção do erro CORS
                        "Access-Control-Allow-Origin": "*",// correção do erro CORS
                        "Access-Control-Allow-Methods": "POST, GET",
                        "Access-Control-Allow-Headers": "*"
                    },
                    success: function (data) {
                        $('#logradouro').val(data.logradouro);
                        $('#inputCity').val(data.localidade);
                        $('#inputEstado').val(data.uf);
                        $('#bairro').val(data.bairro);

                        $('#numero').focus();

                    },
                    crossDomain: true, // correção do erro CORS
                    error: function (erro) {
                        console.log(erro);

                        alert(data);
                    }
                })



            }
        } else alert("Insira o CEP do endereço!");
    });

});