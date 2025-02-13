const functions = require('../src/utils/functions')
import { faker } from '@faker-js/faker';

const randomNPrice = faker.number.int({ min: 100, max: 999999 })
const randomNumber = faker.number.int({ min: 1, max: 999999 })


//1
it('Получить товар по id (Позитивный кейс)', async () => {
    const response = await functions.getItem('34553ac8-4b07-404c-8ea3-c284c24a59a9')
    const data = response.data
    expect(response.status).toBe(200)
// Проверяем, что ответ содержит поля с корректными значениями
    expect(data).toEqual(expect.arrayContaining([
        {
        id: '34553ac8-4b07-404c-8ea3-c284c24a59a9',
        createdAt: '2024-09-21 09:51:00.903809 +0300 +0300',
        name: 'else',
        price: expect.any(Number),
        sellerId: 12,
        statistics: expect.objectContaining({
            contacts: expect.any(Number),
            likes: expect.any(Number),
            viewCount: expect.any(Number),
        }),
    }]))
})

//2
it('Получить товар по id (Негативный кейс, неверный формат id)', async () => {
    await expect(
        functions.getItem('ASDDASDASMDASMD')
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    }); 
}) 

//3
it('Получить товар по id (Негативный кейс, id не существует)', async () => {
    await expect(
        functions.getItem('34553ac8-4b07-404c-8ea3-c284c24a59a0')
    ).rejects.toMatchObject({
        response: {
            status: 404 // Ожидаем статус 404   
        }
    });
})

//4
it('Успешное создание нового объявления (Позитивный кейс, продавец без товаров)', async () => {
    let randomSellerID = 111111; // Начинаем с этого sellerID
    let responseCheckSellerItems;
    let data;

    // Ищем sellerID, у которого нет товаров
    do {
        responseCheckSellerItems = await functions.getItemStatsBySellerId(randomSellerID);
        data = responseCheckSellerItems.data;

    // Если у продавца есть товары (data.length !== 0), то переходим к следующему продавцу
        if (data.length !== 0) {
            console.log(`У продавца с id ${randomSellerID} есть товары. Проверяем следующего продавца.`);
            randomSellerID += 1; // Переходим к следующему sellerID
        }
    } while (data.length !== 0) // Пока у продавца есть товары, продолжаем искать продавца без товаров

        const response = await functions.createItem({
        sellerID: randomSellerID,
        name: 'Новое объявление номер ' + randomNumber,
        price: randomNPrice
    })
    expect(response.status).toBe(200)
    // Проверяем, что ответ содержит поля с информацией о созданном объявлении
    expect(response.data).toEqual(expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        name: 'Новое объявление' +  randomNumber,
        price: randomNPrice,
        sellerId: randomSellerID
    }))
    } 
)

//5
it('Успешное создание нового объявления (Позитивный кейс, продавец с товарами)', async () => {
    let randomSellerID = 111111; // Начинаем с этого sellerID
    let responseCheckSellerItems;
    let data;

    // Ищем sellerID, у которого есть товары
    do {
        responseCheckSellerItems = await functions.getItemStatsBySellerId(randomSellerID);
        data = responseCheckSellerItems.data;

    // Если у продавца нет товаров (data.length === 0), то переходим к следующему продавцу
        if (data.length === 0) {
            console.log(`У продавца с id ${randomSellerID} нет товаров. Проверяем следующего продавца.`);
            randomSellerID += 1; // Переходим к следующему sellerID
        }
    } while (data.length === 0) // Пока у продавца нет товаров, продолжаем искать продавца с товарами

        const response = await functions.createItem({
        sellerID: randomSellerID,
        name: 'Новое объявление номер ' + randomNumber,
        price: randomNPrice
    })
    expect(response.status).toBe(200)
    // Проверяем, что ответ содержит поля с информацией о созданном объявлении
    expect(response.data).toEqual(expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        name: 'Новое объявление' +  randomNumber,
        price: randomNPrice,
        sellerId: randomSellerID
    }))
    } 
)

//6
it('Cоздание нового объявления (Негативный кейс, невалидное тело запроса)', async () => {
    // Ожидаем, что запрос завершится с ошибкой
    await expect(
        functions.createItem({
            sellerID: 'Что-то невнятное',
            name: true,
            price: null
        })
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    });
});

//7
it('Cоздание нового объявления (Негативный кейс, пустое тело запроса)', async () => {
    await expect(
        functions.createItem(null)
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    });
});

//8
it('Получить статистику по объявлению по id (Позитивный кейс)', async () => {
    const response = await functions.getItemStats('34553ac8-4b07-404c-8ea3-c284c24a59a9')
    const data = response.data 
    expect(response.status).toBe(200)
    expect(data).toEqual(expect.arrayContaining([
        {
            contacts: expect.any(Number),
            likes: expect.any(Number),
            viewCount: expect.any(Number),
        }
    ]))
})

//9
it('Получить статистику по объявлению по id (Негативный кейс, id не существует)', async () => {
    await expect(
        functions.getItemStats('34553ac8-4b07-404c-8ea3-c284c24a59a0')
    ).rejects.toMatchObject({
        response: {
            status: 404 // Ожидаем статус 404
        }
    });
})

//10
it('Получить статистику по объявлению по id (Негативный кейс, невалидный формат id)', async () => {
    await expect(
        functions.getItemStats('ASDDASDASMDASMD')
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    });
})

//11
it('Получить список всех объявлений продавца по id продавца (у продавца 1 объявление) (Позитивный кейс)', async () => {
    let randomSellerID = 111111; // Начинаем с этого sellerID
    let responseCheckSellerItems;
    let data;

    // Ищем sellerID, у которого 1 товар
    do {
        responseCheckSellerItems = await functions.getItemStatsBySellerId(randomSellerID);
        data = responseCheckSellerItems.data;

    // Если у продавца количество товаров не равно 1, то переходим к следующему продавцу
        if (data.length !== 1) {
            console.log(`У продавца с id ${randomSellerID} не 1 товар. Проверяем следующего продавца.`);
            randomSellerID += 1; // Переходим к следующему sellerID
        }
    } while (data.length !== 1) // Пока у продавца не 1 товар, продолжаем искать продавца с 1 товаром
    console.log(randomSellerID)
    const response = await functions.getItemStatsBySellerId(randomSellerID)
    const dataResponse = response.data
    expect(response.status).toBe(200)
    // Проверяем, что ответ содержит 1 товар
    expect(dataResponse.length).toBe(1)
    // Проверяем, что ответ содержит поля с информацией о товаре
    expect(dataResponse).toEqual(expect.arrayContaining([ 
        expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number),
            sellerId: expect.any(Number),
            statistics: expect.objectContaining({
                contacts: expect.any(Number),
                likes: expect.any(Number),
                viewCount: expect.any(Number),
            })
        })
    ]))
})

//12
it('Коррректность информации о товаре в ответе на запрос списка товаров продавца по id продавца', async () => {
    const response = await functions.getItemStatsBySellerId('111115')
    const data = response.data
    expect(response.status).toBe(200)
// Проверяем, что ответ содержит поля с корректными значениями
    expect(data).toEqual(expect.arrayContaining([
        expect.objectContaining({
            createdAt: "2025-02-13 13:36:09.66781 +0300 +0300",
            id: "8efa8a21-1016-497a-9da1-80b188397046",
            name: "dsdsd",
            price: 865120,
                sellerId: 111115,
                statistics: {
                    contacts: 0,
                    likes: 0,
                    viewCount: 0
                }
            })
        ])
    )
})


//13
it('Получить список всех объявлений продавца по id продавца (у продавца несколько объявлений) (Позитивный кейс)', async () => {
    const response = await functions.getItemStatsBySellerId('111111')
    const data = response.data
    expect(response.status).toBe(200)
    // Проверяем, что ответ содержит несколько товаров
    expect(data.length).toBeGreaterThan(1)
    // Проверяем, что ответ содержит поля с информацией о товаре
    expect(data).toEqual(expect.arrayContaining([
        expect.objectContaining({
            id: expect.any(String),
            createdAt: expect.any(String),
            name: expect.any(String),
            price: expect.any(Number), 
            sellerId: expect.any(Number), 
            statistics: expect.objectContaining({
                contacts: expect.any(Number), 
                likes: expect.any(Number),
                viewCount: expect.any(Number), 
            }),
        })
    ]));
});

//14
it('Получить список всех объявлений продавца по id продавца (Негативный кейс, неверный формат id)', async () => {
    await expect(
        functions.getItemStatsBySellerId('ASDDASDASMDASMD')
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    });
})

//15
it.only('Получить список всех объявлений продавца по id продавца (Негативный кейс, id продавца не существует)', async () => {
    await expect(
        functions.getItemStatsBySellerId('1002233320000')
    ).rejects.toMatchObject({
        response: {
            status: 404 // Ожидаем статус 404
        }
    });
})

//16
it('Получить список всех объявлений продавца по id продавца (Негативный кейс, отсутствует id Продавца в запросе)', async () => {
    await expect(
        functions.getItemStatsBySellerId(null)
    ).rejects.toMatchObject({
        response: {
            status: 400 // Ожидаем статус 400
        }
    });
})