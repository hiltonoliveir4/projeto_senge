async function captar_respostas(){
    try{    
        const dia = "day1";

        const questao1 = document.querySelector('input[name=questao1]:checked')?.value;
        const questao2 = document.querySelector('input[name=questao2]:checked')?.value;
        const questao3 = document.querySelector('input[name=questao3]:checked')?.value;
        const questao4 = document.querySelector('input[name=questao4]:checked')?.value;

        if(!questao4 || !questao3 || !questao2 || !questao1 ){
            throw new Error ("Você precisa responder todas as questões.");
            return;
        }
        
        const answers = [parseInt(questao1), parseInt(questao2), parseInt(questao3), parseInt(questao4)];

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        if(!nome || !email){
            throw new Error ("O seu nome ou email precisam ser preenchidos para enviar as respostas.");
            return;
        }

        if (!validacaoEmail(email)){
            Swal.fire({
                icon: 'error',
                title: 'Opa!',
                text: `Você precisa inserir um email válido!`,
            });
            return;
        }
        
        Swal.fire({
            title: 'Você tem certeza que deseja enviar essas respostas?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, enviar!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await vote(nome, email, answers, dia);
                Swal.fire(
                    `${response}`,
                ).then( (result) => {
                    if (result.isConfirmed){
                        document.location.reload(true);
                    }
                })
            }
          })
          return;
    } catch (e){
        Swal.fire({
            icon: 'error',
            title: 'Opa!',
            text: `${e.toString().slice(6, -1)}`,
        });
        return;
    }
}


async function vote (name, email, answers, dia){
    const dados = {name, email, answers, dia};
    try{
        const {data} = await axios.post(`https://calm-eyrie-71316.herokuapp.com/vote/${dia}`, dados);
        return data;
    } catch (e){
        return e.response.data;
    }
}

function validacaoEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}