
import { JwtService } from '@nestjs/jwt';

async function testJwt() {
    console.log('Testing JWT signing with undefined secret...');
    const jwtService = new JwtService({
        secret: undefined, // Simulating missing env var
        signOptions: { expiresIn: '60s' },
    });

    try {
        const token = jwtService.sign({ sub: '123' });
        console.log('Token signed successfully:', token);
    } catch (error) {
        console.error('Error signing token:', error.message);
    }
}

testJwt();
