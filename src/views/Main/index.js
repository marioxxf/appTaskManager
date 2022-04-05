import React, {useState} from "react";

import {
    Alert,
    Modal,
    Pressable, 
    View, 
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 

export default function Main(){

    const [modalVisible, setModalVisible] = useState(false);

    //Criando os states 
    let [filme, setFilme] = useState('');
    let [filmeEdicao, setFilmeEdicao] = useState('');
    let [idEditado, setIdEditado] = useState(5);
    let [meusFilmes, setMeusFilmes] = useState([
        
        {
            id: 0,
            nome: 'Vingadores'
        },

        {
            id: 1,
            nome: 'Batman'
        },

    ]);

    //Criando a função que adiciona um novo filme
    function adicionaFilme(){
       let minhasTarefas = [...meusFilmes];
       let tamanhoLista = minhasTarefas.length;

       if(filme.trim() != ''){
        const dados = {
            id: tamanhoLista,
            nome: filme,
          };
     
          //alert("clicou");
      
          setMeusFilmes((oldState) => [... oldState, dados]);
          setFilme('');
       }
       else{
           alert('Digite um nome de um filme')
       }
     
     }

     function esconderModal(){
        let minhasTarefas = [...meusFilmes];


        //console.log(minhasTarefas[idEditado])
        minhasTarefas[idEditado].nome = filmeEdicao;

        setFilmeEdicao('');
        setModalVisible(!modalVisible)
     }

     function deletarfilme(idEditado){

        //console.log('id filme:' + index);
       
        let novosFilmes = [...meusFilmes];

        //console.log(novosFilmes);
         novosFilmes = novosFilmes.filter((item)=>{
           if(item.id != idEditado ) {
            return true;
           }
           else{
               return false;
           }
        });
       
       
       setMeusFilmes(novosFilmes);
       setModalVisible(!modalVisible)
       setFilmeEdicao(''); 
       //console.log(idEditado) 
       
    }

    function atualizar(novoId){
      setIdEditado(novoId);
    }

    function editarTarefa(idEditado){
      console.log(meusFilmes)
        atualizar(idEditado);
        setModalVisible(true);
        console.log(idEditado);
        const dado = meusFilmes[idEditado].nome;
     
        setFilmeEdicao((oldState) => [... oldState, dado]);
     }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu Gerenciador de Tarefas</Text>
            <Text style={styles.subTitulo}>Organize suas tarefas de forma simples e eficiente!</Text>
            <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Área de edição da tarefa</Text>
                    <TextInput onChangeText={setFilmeEdicao} value={filmeEdicao} placeholder="Teste" style={styles.campo}>
                    </TextInput>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => esconderModal()}
                    >
                    <Text style={styles.textStyle}>Editar tarefa</Text>
                    </Pressable>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => deletarfilme(idEditado)}
                    >
                    <Text style={styles.textStyle}>Deletar tarefa</Text>
                    </Pressable>

                    
                </View>
                </View>
            </Modal>
        </View>
            

            <TextInput 
                value={filme}
                returnKeyType="search" 
                style={styles.campo} 
                onChangeText={setFilme}
                placeholder="Digite uma tarefa"/>

            <TouchableOpacity style={styles.botao}  onPress={adicionaFilme}>
                <Text style={styles.textoBotao}>Adicionar tarefa em minha Lista de Tarefas</Text>
                
            </TouchableOpacity>

            <Text style={styles.titulo}>Minha Lista de Tarefas</Text>

            <FlatList
                data={meusFilmes}
                keyExtractor={(item) => item.id}
                renderItem={(({item}) => 
                    <View style={styles.botaoFilme}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.textoBotaoFilme}>{item.nome}</Text>
                            <TouchableOpacity 
                            onPress={() => editarTarefa(item.id)}>
                                <AntDesign name="closecircleo" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
          
            />

        </View>
    );
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: '#633974',
      paddingVertical:70,
      paddingHorizontal:20
  },

  titulo:{
    color: '#FFF',
    fontSize:24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
  },

  subTitulo:{
    color: '#FFF',
    fontSize:15,
    textAlign: "center",
  },

  campo:{
    backgroundColor: '#FDFEFE',
    color: 'black',
    fontSize:18,
    marginTop:30,
    borderRadius:7,
    padding:15
  },

  botao:{
    backgroundColor: '#F2C53D',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20
  },

  textoBotao:{
    color: '#4161BF',
    fontSize:17,
    fontWeight: 'bold'
  },

  botaoFilme:{
    backgroundColor: '#FDFEFE',
    padding:15,
    marginBottom: 10,
    borderRadius: 7,
  },

  textoBotaoFilme:{
    color: '#020202',
    fontSize:22,
    fontWeight: 'bold'
  },









  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});