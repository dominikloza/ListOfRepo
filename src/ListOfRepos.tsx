import * as React from 'react';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


let page = 1;


function getList(page: number) {
    return fetch(`https://api.github.com/orgs/facebook/repos?per_page=10&page=${page}`)
        .then(data => data.json())
}


function numFormatter(num: number) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num < 900) {
        return num;
    }
}


function sortByName(list: any[]) {
    list.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return list;
}

function sortByStars(list: any[]) {
    list.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    });
    return list;
}

export default function ListOfRepos(props: { sortType: string; }) {

    useEffect(() => {
        getList(1)
            .then(items => {
                setList(sortByName(items))
            })
    }, [])


    function loadMore() {
        page++;
        const promise1 = new Promise(() => {
            getList(page)
                .then(items => {
                    setList(prevState => {
                        let sortedList = [];
                        if (props.sortType == "name") {
                            sortedList = sortByName([...prevState, ...items]);
                        } else {
                            sortedList = sortByStars([...prevState, ...items]);
                        }
                        return (sortedList)
                    })
                })
        });
    }

    const [list, setList] = useState<any[]>([]);

    React.useMemo(() => {
        if (props.sortType == "name") {
            setList(sortByName(list));
        } else {
            setList(sortByStars(list));
        }
    }, [props.sortType])


    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} data-testid='list'>
                {list.map(item =>
                    <div key={item.id}>
                        <ListItem sx={{ pl: 0, width: '500px' }} data-testid='list-item'>
                            <ListItemText
                                sx={{ fontSize: '40px' }}
                                primary={item.name}
                                primaryTypographyProps={{
                                    fontSize: 25
                                }}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Description
                                        </Typography>
                                        {" - " + item.description}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Box sx={{ display: 'flex' }}>
                            <StarBorderIcon></StarBorderIcon>
                            <ListItemText
                                primary={numFormatter(item.stargazers_count) + ' Stars'}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                        <Link href={item.html_url} sx={{ mb: '10px' }}>{item.full_name}</Link>
                        <Divider variant="inset" component="li" sx={{ mt: 2 }} />
                    </div>
                )}
            </List>
            <Button variant="contained" sx={{ mb: 2, ml: 2 }}
                onClick={() => {
                    loadMore();
                }} data-testid='button-more'>Load More</Button>
        </div>
    )
}