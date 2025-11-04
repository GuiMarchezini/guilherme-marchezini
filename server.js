require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve arquivos estáticos da pasta atual

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Modelo do usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rota de registro
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        // Criar novo usuário
        const user = new User({
            name,
            email,
            password // Em produção, você deve hash a senha antes de salvar
        });

        await user.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
