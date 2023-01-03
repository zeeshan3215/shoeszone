const shoesController = {};
const shoes=require('../models/shoes.model');

shoesController.getAll = async (req, res) => {
  let Shoes;
  try {
    
    let merged = {};
    let page_n = req.params.page;
    const page_no= parseInt(page_n);
    const page_noo= parseInt(page_n)-3;
    const start = page_n*4;
    const length = 4;
    Shoes = await shoes.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    console.log(Shoes)
    let thi=[];
    let sec=[];
    let arr=[];
    const total = Shoes.total;
    const limit = Shoes.limit;
    const button = parseInt(total/limit)-1;

for(let i=page_no; i<=page_no+3; i++){
  arr[i]=i;
}
for(let i=page_noo; i<page_no; i++){
  thi[i]=i;
}
for(let i=button-2; i<=button; i++){
  sec[i]=i;
}

    const member=Shoes.docs;
    res.render("collrction",{member})

  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

shoesController.add = async (req, res) => {
  try {

    const body = req.body;
    const image = req.file.path;

    const Shoes = new shoes({
      title:body.title,
    category:body.category,
     description:body.description,
     quantity: body.price,
      price:body.price,
    image_url:image
    });

  const result = await Shoes.save();

    res.status(200).send({
      code: 200,
      message: 'shoes Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
module.exports = shoesController;