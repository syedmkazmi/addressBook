/**
 * Created by syedkazmi on 03/12/2016.
 */

module.exports.index = function (req,res) {
    res.render('index', { title: 'Address Book' });
};
