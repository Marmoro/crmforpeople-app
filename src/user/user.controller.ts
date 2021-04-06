import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, Request, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyLoginDTO } from './dto/verify-login.dto';
import { Payload } from '../common/payload.interface';
import { LocalAuthGuard } from '../common/guards/localauth.guard';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { Response } from 'express';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('login')
    async logIn(@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.userService.logIn(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('verify')
    public async verifyLogin(@Body() verifyLoginDTO: VerifyLoginDTO, @Req() req) {

        if (req.user) {
            const result: Payload = {
                statusCode: 200,
                message: 'Success',
                data: req.user,
            };
            return result;
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('profile')
    public getUserProfile(@Request() req) {
        return req.user;
    }

    @Get('isAuthenticated')
    public isAuthenticated(@Request() req) {
        if (!req.user) {
            return false;
        }
        return true;
    }

    @Get('isAdmin')
    public isAuthenticatedAdmin(@Request() req) {
        if (req.user && req.user.roles === 'admin') {
            return true;
        }
        return false;
    }

    @Get('logOut')
    logOut(@Request() req, @Res() res: Response) {
        let result: Payload;

        if (!req.session.passport) {
            throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
        }

        req.logout();
        req.session.destroy();
        req.session = null;
        res.clearCookie('connect.sid', { path: '/' }).status(200).send('Ok.');
        result = {
            statusCode: 200,
            message: 'Success',
        };
        return result;
    }
}
