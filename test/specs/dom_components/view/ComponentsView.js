import DomComponents from 'dom_components';
import ComponentsView from 'dom_components/view/ComponentsView';
import Components from 'dom_components/model/Components';

describe('ComponentsView', () => {
  var $fixtures;
  var $fixture;
  var model;
  var view;
  var dcomp;
  var compOpts;

  beforeEach(() => {
    dcomp = new DomComponents();
    compOpts = {
      componentTypes: dcomp.componentTypes
    };
    model = new Components([], compOpts);
    view = new ComponentsView({
      collection: model,
      componentTypes: dcomp.componentTypes
    });
    document.body.innerHTML = '<div id="fixtures"></div>';
    document.body.querySelector('#fixtures').appendChild(view.render().el);
  });

  afterEach(() => {
    view.collection.reset();
  });

  test('Collection is empty', () => {
    expect(view.$el.html()).toBeFalsy();
  });

  test('Add new component', () => {
    sinon.stub(view, 'addToCollection');
    view.collection.add({});
    expect(view.addToCollection.calledOnce).toEqual(true);
  });

  test('Render new component', () => {
    view.collection.add({});
    expect(view.$el.html()).toBeTruthy();
  });
});
