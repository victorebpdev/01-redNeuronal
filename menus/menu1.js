 const menu1 = {
    type:'list',
    name:'option',
    message:'What would you like to do?',
    choices: [
        {
            value: '1',
            name: `${'1. '.green + 'Training IA'}`
        },
        {
            value: '2',
            name: `${'2. '.green +'Next iteration'}`
        },   
        {
            value: '3',
            name: `${'3. '.green +'Apply Correction'}`
        }, 
        {
            value: '4',
            name: `${'4. '.green +'Results'}`
        },    {
            value: '5',
            name: `${'5. '.green +'Save DATA'}`
        },        
        {
            value: '0',
            name: `${'0. '.green +'Exit'}`
        },
        
    ]
};

export default menu1;