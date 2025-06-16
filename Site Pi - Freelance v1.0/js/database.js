// Configuração do banco de dados
const DB_NAME = 'WorklyDB';
const DB_VERSION = 2;
const USER_STORE = 'users';

let db;


function initDB() { //função initDB cria conexao com banco (local/noSQL)
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = (event) => {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
            reject('Erro ao abrir o banco de dados');
        };
        
        request.onsuccess = (event) => {
            db = event.target.result;
            console.log('Banco de dados aberto com sucesso');
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Cria a store de usuarios se não existir
            if (!db.objectStoreNames.contains(USER_STORE)) {
                const userStore = db.createObjectStore(USER_STORE, { keyPath: 'email' });
                
                // Cria indices para busca
                userStore.createIndex('nome', 'nome', { unique: false });
                userStore.createIndex('senha', 'senha', { unique: false });
                
                console.log('Object store de usuários criado');
            }
        };
    });
}

// adicionar um usuario
function addUser(user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([USER_STORE], 'readwrite');
        const store = transaction.objectStore(USER_STORE);
        
        const request = store.add(user);
        
        request.onsuccess = () => {
            console.log('Usuário adicionado com sucesso:', user);
            resolve();
        };
        
        request.onerror = (event) => {
            console.error('Erro ao adicionar usuário:', event.target.error);
            reject('Erro ao adicionar usuário');
        };
    });
}

// buscar um usuario por email
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([USER_STORE], 'readonly');
        const store = transaction.objectStore(USER_STORE);
        
        const request = store.get(email);
        
        request.onsuccess = () => {
            resolve(request.result);
        };
        
        request.onerror = (event) => {
            console.error('Erro ao buscar usuário:', event.target.error);
            reject('Erro ao buscar usuário');
        };
    });
}

// verificar credenciais de login
async function checkCredentials(nome, senha) {
    try {
        // encontra usuario pelo nome
        const transaction = db.transaction([USER_STORE], 'readonly');
        const store = transaction.objectStore(USER_STORE);
        const index = store.index('nome');
        
        const request = index.get(nome);
        
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const user = request.result;
                if (user && user.senha === senha) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            };
            
            request.onerror = (event) => {
                console.error('Erro ao verificar credenciais:', event.target.error);
                reject('Erro ao verificar credenciais');
            };
        });
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}
//-------------------------------------------------------------------------------------
// Inicializa o banco de dados quando a pagina carrega
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initDB();
        console.log('Banco de dados inicializado com sucesso');
        
        // array de usuarios para exemplo (apenas para teste) 
        const users = [
            { nome: 'Admin', email: 'admin@workly.com', senha: 'admin123' },   //DB ADMIN
            { nome: 'Usuário Teste', email: 'teste@workly.com', senha: 'teste123' }, // DB, Usuario teste
            { nome: 'caua', email: 'cauamoraes@workly.com', senha: 'caua1234' } 
        ];
        
        for (const user of users) {
            try {
                await addUser(user);
            } catch (error) {
                // Ignora erros de usuários ja existentes
                if (error.toString().includes('already exists')) continue;
                console.error(error);
            }
        }
    } catch (error) {
        console.error('Falha ao inicializar o banco de dados:', error);
    }
});


//Users: Admin, Usuário Teste, caua
//Senhas: admin123, teste123 , caua1234