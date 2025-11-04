// Configuração do MongoDB
const MONGODB_URI = ''; // Vamos adicionar a URI do MongoDB Atlas depois

// Função para enviar dados do formulário
async function submitForm(userData) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            return true;
        } else {
            alert(`Erro no cadastro: ${data.message}`);
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao tentar cadastrar. Por favor, tente novamente.');
        return false;
    }
}
