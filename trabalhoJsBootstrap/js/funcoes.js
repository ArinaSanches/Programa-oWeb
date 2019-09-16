function criarLinha(aluno){
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	cell.appendChild(document.createTextNode(aluno.matricula));
	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);

	cell = document.createElement('td');
	cell.appendChild(document.createTextNode(aluno.nome));
	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);

	cell = document.createElement('td');
	var g = document.createElement("button");
	g.setAttribute("class","btn-danger")
	g.innerHTML = 'Remover';
	g.setAttribute('onclick',"removerAluno("+aluno.matricula+")"); 
	cell.appendChild(g);
	row.appendChild(cell);
	document.getElementById('tt').appendChild(row);
}

function ordenarPorMatricula(aluno1, aluno2){
	return aluno1.matricula - aluno2.matricula;
}

function exibirInfoMatricula(){

	var modal = document.getElementById('modalMatricula');
	modal.style.display = "block";	
	
	document.getElementById("inputMatricula").focus();

	window.onclick = function(event) {
		if (event.target == modal) {
			document.getElementById('inputMatricula').value='';
			modal.style.display = "none";
		}
	}	

	var cancelar = document.getElementById('btnFechar');
	cancelar.onclick = function() {
		document.getElementById('inputMatricula').value='';
		modal.style.display = "none";
	}

	var cancelar = document.getElementById("closeMat");
	cancelar.onclick = function() {
		document.getElementById('inputMatricula').value='';
		modal.style.display = "none";
	}

}

function validarMatricula(){
	var matricula = document.getElementById('inputMatricula').value;
	console.log(matricula)

	var i;
	var controle = "valido";

	for(i = 0; i < alunos.length; i++){
		if (alunos[i].matricula == matricula){
			exibirInfoMatricula();
			controle = "invalido";
		}
	}
	return controle;
}

function InserirAluno(){
	
	//var validacao = validarMatricula();

	if(document.getElementById('formulario').checkValidity()){
     	if(validarMatricula() == "valido"){
     	if(alunos.length == 0){
			document.getElementById('tt').deleteRow(0);
		}
		
		var tableBody = document.getElementById('tt')
		
		var aluno = new Object();

		aluno['matricula'] = document.getElementById('inputMatricula').value;
		aluno['nome'] = document.getElementById('inputNome').value;
		aluno['nascimento'] = document.getElementById('inputDataNascimento').value;
		aluno['email'] = document.getElementById('inputEmail').value;
		aluno['ddd'] = document.getElementById('inputDDD').value;
		aluno['telefone'] = document.getElementById('inputTelefone').value;
		aluno['operadora'] = document.getElementById('inputOperadora').value;
		aluno['campus'] = document.getElementById('inputCampus').value;
		aluno['curso'] = document.getElementById('inputCursos').value;

		alunos.push(aluno);

		alunos.sort(ordenarPorMatricula);

		var linhas = document.querySelectorAll("tbody tr");			

		linhas.forEach(linha => linha.parentNode.removeChild(linha));

		alunos.forEach(aluno => criarLinha(aluno));
		}
		console.log("oi");
		return false;	
	}			
}


function removerAluno(matricula){
	var modal = document.getElementById('modalConfirmacao');
	modal.style.display = "block";

	window.onclick = function(event) {
			if (event.target == modal) {
			modal.style.display = "none";
			}
	}	

	var cancelar = document.getElementById('removerCancelar');
	cancelar.onclick = function() {
			modal.style.display = "none";
	}

	var cancelar = document.getElementById('closeConf');
	cancelar.onclick = function() {
			modal.style.display = "none";
	}

	var remover = document.getElementById('removerOk');
	remover.onclick = function() {

		var index;

		var i;
		for(i = 0; i < alunos.length; i++){
			if (alunos[i].matricula == matricula){
				index = i;
				i = alunos.length;
			}
		}

		alunos.splice(index, 1);
		
		alunos.sort(ordenarPorMatricula);

		var linhas = document.querySelectorAll("tbody tr");			

		linhas.forEach(linha => linha.parentNode.removeChild(linha));

		alunos.forEach(criarLinha);

		modal.style.display = "none";

		if(alunos.length == 0){
			var row = document.createElement('tr');
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode("Sem registros de alunos"));
			row.appendChild(cell);
			document.getElementById('tt').appendChild(row);
		}
	} 			

}

function exibirInfoAutor(){
	console.log(cursosCampus);
	var modal = document.getElementById('modalAjuda');
	modal.style.display = "block";

	window.onclick = function(event) {
		if (event.target == modal) {
		modal.style.display = "none";
		}
	}	

	var cancelar = document.getElementById('fechar');
	cancelar.onclick = function() {
		modal.style.display = "none";
	}

	var cancelar = document.getElementById('closeAjuda');
	cancelar.onclick = function() {
		modal.style.display = "none";
	}
}

function atualizarOpc(){
	var campus = document.getElementById('inputCampus').value

	var cursos = document.querySelectorAll("#inputCursos option");
	var i;
	for(i = 0; i < 3; i++){
		cursos[i].innerHTML = cursosCampus[campus][i];
	} 	
}

function limparDados(){

	document.getElementById('inputMatricula').value = "";
	document.getElementById('inputNome').value = "";
	document.getElementById('inputDataNascimento').value = "";
	document.getElementById('inputEmail').value = "";
	document.getElementById('inputDDD').value = "";
	document.getElementById('inputTelefone').value = "";
}

function mascara(){ 

	var telefone = document.getElementById('inputTelefone');

    if(telefone.value.length == 5)
        telefone.value = telefone.value + '-'; 
}

var alunos = new Array();

var cursosCampus = {
	"Pici" : ["Computação", "Matemática", "Geologia"],
	"Benfica": ["Letras", "Filosofia", "Direito"],
	"Porangabusso" : ["Medicina", "Odontologia", "Farmácia"]
}

var campus = document.getElementById('inputCampus');
campus.addEventListener("change", atualizarOpc);

var ajuda = document.getElementById('ajuda');
ajuda.onclick = exibirInfoAutor;

var inserir = document.getElementById('btnInserir');
inserir.onclick = InserirAluno;

var limpar = document.getElementById('btnLimpar');
limpar.onclick = limparDados;

var telefone = document.getElementById('inputTelefone');
telefone.addEventListener("keyup",mascara);




