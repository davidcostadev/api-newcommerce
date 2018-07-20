import { Router } from 'express';
import dotenv from 'dotenv';
import middleware from './middleware';
import spWebWebsiteMenuSel from './controllers/sp_web_website_menu_sel';
import spWebBuscaMenuSel from './controllers/sp_web_busca_home_sel';
import spWebBuscaMaisVendidosSel from './controllers/sp_web_busca_maisvendidos_sel';
import spWebsiteUrlSel from './controllers/sp_website_url_sel';
import spWebBuscaLandingpageSel from './controllers/sp_web_busca_landingpage_sel';
import spWebBuscaVerticalSel from './controllers/sp_web_busca_vertical_sel';
import Auth from './controllers/Auth';
import Categories from './controllers/Categories';
import CategoriesRel from './controllers/CategoriesRel';
import Menu from './controllers/Menu';
import Offers from './controllers/Offers';
import OfferContent from './controllers/OfferContent';
import OffersRel from './controllers/OffersRel';
import ProductImages from './controllers/ProductImages';
import Search from './controllers/Search';
import User from './controllers/User';

dotenv.config();

const router = Router();

const domain = process.env.DOMAIN;
const namespace = process.env.NAMESPACE;

router.get('/', (req, res) => {
  res.send({
    apis: {
      v1: {
        Tsvmwebsite: [
          `${domain}${namespace}Tsvmwebsite/sp_web_website_menu_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_home_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_ultimasentrada_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_maisvisitados_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_maisvendidos_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_website_url_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_landingpage_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_vertical_sel`,
          `${domain}${namespace}categories`,
          `${domain}${namespace}categories/:id`,
          `${domain}${namespace}categoriesRel`,
          `${domain}${namespace}categoriesRel/:id`,
          `${domain}${namespace}menu`,
          `${domain}${namespace}offers`,
          `${domain}${namespace}offers/:id`,
          `${domain}${namespace}offers/:id/content`,
          `${domain}${namespace}offers/:id/rel`,
          `${domain}${namespace}products/:id/images`,
          `${domain}${namespace}content`,
          `${domain}${namespace}content/:id`,
          `${domain}${namespace}search`,
          `${domain}${namespace}users`,
          `${domain}${namespace}auth/register`,
          `${domain}${namespace}auth/login`,
        ],
      },
    },
  });
});

// custom routers

router.all(`${namespace}Tsvmwebsite/sp_web_website_menu_sel`, spWebWebsiteMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_home_sel`, spWebBuscaMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_ultimasentrada_sel`, spWebBuscaMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_maisvisitados_sel`, spWebBuscaMaisVendidosSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_maisvendidos_sel`, spWebBuscaMaisVendidosSel);
router.all(`${namespace}Tsvmwebsite/sp_website_url_sel`, spWebsiteUrlSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_landingpage_sel`, spWebBuscaLandingpageSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_vertical_sel`, spWebBuscaVerticalSel);

router.post(`${namespace}auth/register`, middleware.checkAuth, Auth.register);
router.post(`${namespace}auth/login`, Auth.login);
router.get(`${namespace}categories`, Categories.list);
router.get(`${namespace}categories/:id`, Categories.get);
router.get(`${namespace}categoriesRel`, CategoriesRel.list);
router.get(`${namespace}categoriesRel/:id`, CategoriesRel.get);
router.get(`${namespace}content`, OfferContent.list);
router.get(`${namespace}content/:id`, OfferContent.get);
router.get(`${namespace}menu`, Menu.list);
router.get(`${namespace}offers`, Offers.list);
router.get(`${namespace}offers/:id`, Offers.get);
router.get(`${namespace}offers/:id/content`, OfferContent.byOffers);
router.get(`${namespace}offers/:id/rel`, OffersRel.byOffers);
router.get(`${namespace}products/:id/images`, ProductImages.list);
router.get(`${namespace}search`, Search.list);
router.get(`${namespace}users`, middleware.checkAuth, User.list);

export default router;
