export class User {
  
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
    nombreCorto?: string;

    cargarUsuarioCorto() {
      
        
    }

    constructor(usuarioFirebase: firebase.User){

        this.uid = usuarioFirebase.uid;
        this.email = usuarioFirebase.email;
        this.photoURL = usuarioFirebase.photoURL;
        this.displayName = usuarioFirebase.displayName;

        switch(this.email){
            case 'fed_lanza@hotmail.com':
                this.nombreCorto = 'Fede';
                break;
            case 'ceciliacampos@hotmail.com':
                this.nombreCorto = 'Ceci';
                break;
        }
    }
}