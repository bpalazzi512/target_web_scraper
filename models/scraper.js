const puppeteer = require('puppeteer');
const $ = require('cheerio')

class Scraper{
    
    sayHi(){
        alert('hello')
    }
    async getContent(url){
        const browser = await puppeteer.launch({ 
            headless:true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        await page.goto(url);
        
        
        
        const content =  await page.content();
        const pickupAvailable = $('[data-test=orderPickupMessage]', await content).length > 0;
        const deliveryAvailable = $('[data-test=deliverToZipCodeMessage]', await content).length > 0;
        const outOfStock = $('[data-test=outOfStockNearbyMessage]', await content).length > 0;
        const pickupFarAvailable = $('[data-test=inStoreOnlyMessage]', await content).length > 0;
        
        console.log(outOfStock);
        console.log(pickupAvailable);
        console.log(deliveryAvailable);
        console.log(pickupFarAvailable);
        
        //checks if out of stock
        if(!outOfStock){
            if(pickupAvailable && deliveryAvailable){
                console.log("Delivery and Local Pickup Available");
                return "Delivery and Local Pickup Available"
                
            }
            //checks if pickup is available but not delivery
            else if(pickupAvailable && !deliveryAvailable){
                console.log("In Store pickup available")
                return "In Store pickup available"
                
        
            }
            //checks if delivery is available but not pickup
            else if(deliveryAvailable && !pickupAvailable && !pickupFarAvailable){
                console.log("delivery available")
                return "delivery available"
                
        
            }
            //sees if delivery and pickup far away are available
            else if(pickupFarAvailable && deliveryAvailable){
                console.log($('[data-test=inStoreOnlyMessage]', await content).text()+" and delivery available");

                return $('[data-test=inStoreOnlyMessage]', await content).text()+" and delivery available"
                
            }
            //if just pickup far away available
            else if (pickupFarAvailable && !deliveryAvailable){
                console.log($('[data-test=inStoreOnlyMessage]', await content).text()+" for pickup");
                
                return $('[data-test=inStoreOnlyMessage]', await content).text()+" for pickup"
                
            }
            
        }else{
            console.log("out of stock in all nearby stores");

            return ("out of stock in all nearby stores")
        }
        
        
        
        
        await browser.close();
        
    }
    sayHi(){
        console.log("sraper working")
    }
}

module.exports = Scraper;

