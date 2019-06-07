var rodada = 1;
var jogo_matriz = Array(3);

jogo_matriz['a'] = Array(3);
jogo_matriz['b'] = Array(3);
jogo_matriz['c'] = Array(3);

jogo_matriz['a'][1] = 0;
jogo_matriz['a'][2] = 0;
jogo_matriz['a'][3] = 0;

jogo_matriz['b'][1] = 0;
jogo_matriz['b'][2] = 0;
jogo_matriz['b'][3] = 0;

jogo_matriz['c'][1] = 0;
jogo_matriz['c'][2] = 0;
jogo_matriz['c'][3] = 0;


$(document).ready( function(){

    $('#btn_start_jogo').click( function(){

        //validar os nomes inseridos

        if($('#nome_jogador1').val() == ''){

            alert('Favor inserir o nome do Jogador 1.');
            return false;
        }

        if($('#nome_jogador2').val() == ''){

            alert('Favor inserir o nome do Jogador 2.');
            return false;
        }

        //exibir nomes de jogadores

        $('#jogador1_nick').html($('#nome_jogador1').val());
        $('#jogador2_nick').html($('#nome_jogador2').val());

        // altenar interface de jogo

        $('#tela_inicio').hide();
        $('#tela_jogo').show();
    })
        //cursor pointer start
        $('#btn_start_jogo').mouseover(function() {
            $(this).css("cursor","pointer");
        });
        
        //Botao voltar!

    $('#btn_voltar_tela').click( function(){
        
        location.reload();   
        

        //Limpar nomes
        $('#nome_jogador1').val('');  
        $('#nome_jogador2').val(''); 

    })
        //cursor pointer voltar
        $('#btn_voltar_tela').mouseover(function() {
            $(this).css("cursor","pointer");
        });


        // Jogadas
    $('.jogadas').click( function(){

        var id_clicado = this.id;
        $('#'+id_clicado).off();
        jogadas(id_clicado);
    })

    function jogadas(id){
        var icone = '';
        var ponto = 0;

        if((rodada % 2) == 1){
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1            
        } else {
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;
        }
        rodada ++;

        $('#'+id).css('background-image',icone);

        var linha_coluna = id.split('-');

        jogo_matriz[linha_coluna[0]][linha_coluna[1]] = ponto;

        verificar_combinacao();
    }

    //cursor pointer jogadas
    $('.jogadas').mouseover(function() {
        $(this).css("cursor","pointer");
    });

    function verificar_combinacao(){

        //horizontal
        var pontos = 0;
        for (var i = 1; i <=3 ; i++){
            pontos += jogo_matriz['a'][i]
        }
        vencedor(pontos);
        
        pontos = 0;
        for (var i = 1; i <=3 ; i++){
            pontos += jogo_matriz['b'][i]
        }
        vencedor(pontos);
        
        pontos = 0;
        for (var i = 1; i <=3 ; i++){
            pontos += jogo_matriz['c'][i]
        }
        vencedor(pontos);
        
        //vertical
        for( l = 1; l <= 3; l++){
            pontos = 0;
            pontos += jogo_matriz['a'][l];
            pontos += jogo_matriz['b'][l];
            pontos += jogo_matriz['c'][l];
            
            vencedor(pontos);
        }
        //diagonal
        pontos = 0;
        pontos = jogo_matriz['a'][1] + jogo_matriz['b'][2]+ jogo_matriz['c'][3];
        vencedor(pontos);

        pontos = 0;
        pontos = jogo_matriz['a'][3] + jogo_matriz['b'][2]+ jogo_matriz['c'][1];
        vencedor(pontos);


    }

    function vencedor(pontos){

        if(pontos == -3){
            var vencedor1 = $('#nome_jogador1').val();
            alert(vencedor1 +' é o vencedor!')
            $('.jogadas').off();
        } else if(pontos == 3){
            var vencedor2 = $('#nome_jogador2').val();
            alert(vencedor2+' é o vencedor!')
            $('.jogadas').off();
        } 
        
    }
})