import * as os from 'os';
import * as tkit from 'terminal-kit';
import Logger from './modules/logger';
import patchIt from './modules/discordPathChanger';

const logger = new Logger();

if(os.platform() !== 'win32') {
    logger.warn('This application is not made for your operating system.');
    process.exit();
}

const term = tkit.terminal;

term.windowTitle('AngelGuard v0.1');

process.on('unhandledRejection', () => { return });

const question = async () => {

    await logger.warn("Hi, how are you?");
    await logger.warn("This patch here will permanently modify your Discord...");
    await logger.info(`So if you don't know what you're doing and such, it's better to close the program while it's still possible.`);
    await logger.info(`But if you know what you are doing, READ THE DOCUMENTATION >:), then you can go ahead.`);
    await logger.info(`How does it work? Well... We are going to modify Discord on your PC`);
    await logger.info(`So it can hide itself against threats of all kinds trying steal your account`);
    await logger.info(`But seriously, none of this replaces system files. Only Discord.`);
    await logger.info(`So follow common sense and don't open anything you don't know what it is`);
    await logger.info(`Even if it comes from a friend of yours!`);

    term.cyan(`\n\n               Press [Y or ENTER] to start and [N] to exit`);
    
    term.yesOrNo({ yes: ['Y', 'ENTER', 'y'], no: ['n', 'N'] }, async (err, result) => {''
        if (result) {
            term.clear();
            await logger.proc('Source code and updates for this program can be found at: https://github.com/AlevEve/AngelGuard');
            await logger.proc("Credits: Chinese // Banking Lab's.");

            term.clear();

            logger.proc("Have you applied the patch before? ('Y' for YES and 'N' for NO).");
            term.yesOrNo({ yes: [ 'y', 'Y' ], no: [ 'N', 'n' ] }, async (err, _result) => {

            if(_result) {
                logger.proc('Enter your previous encryption key: ');
                const load_hash = await term.inputField({}).promise;


                patchIt(load_hash);

            } else {
                logger.proc("Assuming your Discord path is: 'discord'");
                
                patchIt('discord');
            
            }
        }); 
        } else {
            process.exit();
        }
    });
};

question();
