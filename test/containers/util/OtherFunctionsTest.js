import {getSubstring} from '../../../src/containers/util/OtherFunctions';


describe('Testing getSubstring', () => {
  it('Testing if the substring functions works correctly with long string description', () => {
    const str = 'CHANGE is a mobile-only bank that is built by millennials for millennials.';
    expect(getSubstring(str)).to.eql('CHANGE is a mobile-only bank that is built by millennials for millennials.');
  });
  it('Testing if the substring functions works correctly when len string < limit', () => {
    const str = 'Document automation and management';
    expect(getSubstring(str)).to.eql('Document automation and management');
  });
});
