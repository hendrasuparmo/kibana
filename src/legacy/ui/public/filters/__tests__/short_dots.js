/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import expect from '@kbn/expect';
import ngMock from 'ng_mock';
import 'plugins/kibana/discover/index';
import '../short_dots';


let filter;

let config;

const init = function () {
  // Load the application
  ngMock.module('kibana');

  // Create the scope
  ngMock.inject(function ($filter, _config_) {
    config = _config_;
    filter = $filter('shortDots');
  });
};


describe('shortDots filter', function () {

  beforeEach(function () {
    init();
  });

  it('should have a uriescape filter', function () {
    expect(filter).to.not.be(null);
  });

  it('should shorten foo.bar.baz to f.b.baz when shortDots:enable is true', function () {
    config.set('shortDots:enable', true);
    expect(filter('foo.bar.baz')).to.be('f.b.baz');
  });

  it('should not shorten when shortDots:enable is false', function () {
    config.set('shortDots:enable', false);
    expect(filter('foo.bar.baz')).to.be('foo.bar.baz');
  });

  it('should not shorten floating point numbers in any case', function () {
    config.set('shortDots:enable', false);
    expect(filter(12345.6789)).to.be(12345.6789);
    config.set('shortDots:enable', true);
    expect(filter(12345.6789)).to.be(12345.6789);
  });


});
