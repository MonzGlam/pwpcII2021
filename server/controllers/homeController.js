const index = (req, res) => {
  res.render('index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Campeon de la Fullstack web'
  });

};

export default {
  index,
};

