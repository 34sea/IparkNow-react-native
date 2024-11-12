import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
    <View style={ViewsStyle.bodyView}>
      <View style={ViewsStyle.imgTP}>
         <Image
          source={require('@/assets/images/iparknow.png')}
          style={imagens.partenLogo}
        />
        <Text style={textos.titulo}>
            Mecanic
        </Text>
        
      </View>
      <Text style={textos.paragrafo}>
         Encontre vagas com facilidade, com mais de 20 opções a sua disposição
        </Text>
      <View style={ViewsStyle.footer}>
        <View style={{width: "80%", flexDirection: "column-reverse", marginBottom: 20}}>
            <Link href={"/login"} style={LinksR.LinksRR}>
              <Text>
                Entrar
              </Text>
            </Link>
            <Link href={"/adduser"} style={LinksR.LinksRRR}>
              Criar
            </Link>
        </View>
      </View>
      
    </View>
  );
}

const ViewsStyle = StyleSheet.create({
    bodyView: {
      backgroundColor: "white",
      height: "100%"
    },

    imgTP: {
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      // padding: 40
    },

    footer: {
      position: "absolute",
      bottom:  0,
      left: 0,
      backgroundColor: "white",
      width: "100%",
      height: 80,
      flexDirection: "column-reverse",
      justifyContent: "space-between",
      alignItems: "center"
    },
});

const textos = StyleSheet.create({
  titulo: {
    color: "#00cc99",
    fontSize: 25,
    fontWeight: "700",
    width: "65%",
    textAlign: "center",
    marginTop: 7,
    display: "none"
  },

  paragrafo: {
    color: "#777777",
    fontSize: 15,
    // fontWeight: "400",
    width: "85%",
    textAlign: "center",
    marginTop: 7,
    position: "absolute",
    top: "50%",
    left: "7%"
  }
})

const imagens = StyleSheet.create({
  partenLogo: {
    height: 120,
    width: 150,
   marginTop: 60
  },
})

const LinksR = StyleSheet.create({
  LinksRR: {
    display: 'flex',
    marginLeft: 0,
    backgroundColor: "#00cc99",
    color: "white",
    height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7, 

  }, 
  LinksRRR: {
    display: 'none',
    backgroundColor: "#ffffff",
    color: "#00cc99",
    height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 10
  }
})
