# CallCongress.How

![CallCongress sreenshot](/public/images/callcongress2-screnshot.jpg)

## What is CallCongress.How?

Now more than ever, the cultural paradigm is ripe for citizen political involvement. Division is high, freedoms are threatened, and legislators' phones are busier than ever. CallCongress.how provides easy access to legislator contact information and a platform to post political events.

## Technical Discussion

<dl>
<dt>React.JS</dt>
<dd>The front end of this app was bootstrapped with create-react-app.</dd>
<dt>Node.JS (by way of Express)</dt>
<dd>The app is running on an Express server for its internal API and route handding.</dd>
<dt>PostgreSQL</dt>
<dd>User data is stored in a PostgreSQL database.</dd>
<dt>Additional Libraries</dt>
<dd>This app makes use of Axios, Passport, React Router, and Express-Sessions.</dd>
<dt>Flexbox</dt>
<dd>Rather than using an external CSS framework, I made use of CSS's built-in flexbox property to create a lightweight and responsive site.</dd>
<dt>ProPublica API</dt>
<dd>I used the <a href='https://propublica.github.io/congress-api-docs/' target='_blank'>ProPublica Congress API</a> to get the information about legislators and laws.</dd>
</dl>

### Notes on App Structure

CallCongress.How is neatly divided between two sections: the React frontend and the Express backend, connected through AJAX calls. Here's an example of one such cycle from the Bills component:

```javascript
// in the Bill component, when the component mounts,
// the component sends a request to the server's backend.
  componentDidMount() {
    axios.get('/api/ext/bills')
      .then((res) => {
        this.setState({
          senateInfo: res.data.senateInfo,
          houseInfo: res.data.houseInfo
        })
      })
      .catch((err) => console.log(err));
  }
```

```javascript
// then, the api/ext router catches the request.
extRouter.get('/bills', lawHelpers.getHouse, lawHelpers.getSenate, lawHelpers.manipulateBills, (req, res, next) => {
  console.log('sending');
  res.send({
    message: 'ok',
    houseInfo: res.locals.houseInfo,
    senateInfo: res.locals.senateInfo
  })
})
```

```javascript
// after the two requests to get the information, the responses
// are manipulated into a form the component can use:
function createSortedLawSet(arr) {
  let newLawSet = [];
  for (let lawSet of arr) {
    lawSet.forEach((law) => {
      law.lookup_cc = law.number.split(/[\s\.]{1}/g).join('').toLowerCase();
      newLawSet.push(law);
    })
  }
  newLawSet.sort((a, b) => {
    let timeA = manipulateTime(a);
    let timeB = manipulateTime(b);
    return timeB - timeA;
  });
  console.log(newLawSet);
  return newLawSet;
}

function manipulateTime(obj) {
  let time = new Date(obj.latest_major_action_date).getTime();
  return time;
}

function manipulateBills(req, res, next) {
  res.locals.senateInfo = createSortedLawSet(res.locals.senateTemp);
  res.locals.houseInfo = createSortedLawSet(res.locals.houseTemp);
  return next();
}
// which is sent back as a JSON response.
```

```html
// Finally, the information is sent back to the component,
// where it renders in the appropriate subcomponent.
<div className='bills-list'>
  {(this.state.active == 'senate') ? 
  <BillList laws={this.state.senateInfo} 
    watchLaw={this.props.watchLaw}  
    learnLaw={this.props.learnLaw} /> : 
  <BillList laws={this.state.houseInfo} 
    watchLaw={this.props.watchLaw} 
    learnLaw={this.props.learnLaw} /> }
</div>
```

## The Making of CallCongress.How

<dl>
<dt>Author</dt>
<dd>J Silverstein</dd>
<dt>Credits</dt>
<dd>Event icons are from a number of people on TheNounProject: Ana María Lora Macias, iconsphere, Lorena Salagre, Sherrinford, Juan Pablo Bravo, and Wilson Joseph.</dd>
<dd>Most of the inspirational quotes on the home page are from the West Wing.</dd>
<dd>Thanks to my wonderful instructors and peers at General Assembly for making this experience extremely meaningful.</dd>
</dl>

## Opportunities for Future Growth

I have a pretty solid plan for the next stages of CallCongress.how. 

![Next Steps](/public/images/future-development.jpg)

In addition to the next few levels, I plan to refactor some portions of the app as it currently exists.

## Future Stages of Development

CallCongress.how has been a project of mine for some time. Initially envisioned as a static site serving up phone scripts to make calling congresspeople easier for those who may not be at their most eloquent on the phone, it's evolved in my mind into something more interactive. I don't think it'll ever be a full-blown social network, exactly, but it's evolved into a tool that can be used to build political momentum, keep voters informed about their legislators' activity, and bring like-minded people together.

That being said, a resource of user-submitted phone scripts for political action would still be valuable, and I'd like to add in a way for users to add scripts and tag them with the appropriate bills, topics, people, or locations. This would also require a way to moderate the submitted scripts.

Beyond that, it would be challenging but exciting to add local government officials to the mix. State and local governmental APIs are hard to find, and the ones I have found are frequently abandoned (for example, the Indiana API hasn't been updated since 2014). However, change doesn't start at the top -- it starts at the bottom, with grassroots movements of well-informed citizens who work together to make a difference in their towns, counties, districts, and states.

In the far future, my vision for CallCongress.how includes a national network of people working to provide information on local politics in real-time.