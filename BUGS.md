# Баг репорт

№ | 1
---|---
Title|	При создании объявления о товаре в ответе не возвращается информация о товаре
Severity|	Low
Priority|	Normal
Environment	|"Windows 10 Домашняя, x64"
Precondition| 
STR	|1. Выполнить POST запрос https://qa-internship.avito.com/api/1/item, указав в теле запроса валидные данные (например: {"sellerID": 1, "name": "test", "price": 100})
AR	|В теле ответа содержится уведомление о созданном товаре и присвоенном ему id
ER	|В теле ответа содержится уведомление о созданном объявлении и информация о товаре в виде id = '', name = '', price = '', sellerId = ''
Attachments |
	
	
№|	2
---|---
Title|	При выполнении поиска товаров по id несуществующего продавца возвращается ответ 200 и пустой список товаров
Severity|	Normal
Priority|	Normal
Environment|	"Windows 10 Домашняя, x64"
Precondition| 
STR|	1. Выполнить GET запрос https://qa-internship.avito.com/api/1/:sellerID/item, указав SellerID несуществующего продавца (например 1002233320000)
AR|	Ответ с кодом 200. Тело ответа содержит пустой список.(Якобы такой продавец уже создан но пока не имеет товаров)
ER|	Ответ с кодом 404 и сообщением об том, что продавец с таким id не найден
Attachments |
	
	
№|	3
---|---
Title|	При запросе информации об объявлениях продавца по id продавца в ответе имя товара перепутано с id товара
Severity|	Critical
Priority|	High
Environment|	"Windows 10 Домашняя, x64"
Precondition| Создать или найти существующее объявление
STR	|"1. Выполнить GET запрос https://qa-internship.avito.com/api/1/:sellerID/item, указав SellerID валидного продавца (например 111111)
AR|	В теле ответа имя товара перепутано с id товара
ER|	В теле ответа имя товара и id товара не перепутаны
Attachments	|
