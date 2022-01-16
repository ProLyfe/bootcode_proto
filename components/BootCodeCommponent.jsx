const BootCodeComponent = ({ bootcode }) => {

    // const { name, html, css } = bootcode;
    const { html, css, js } = bootcode;
    
    js && eval(js);
    

    return (
        <div>
            {/* <center><h4>{name}</h4></center> */}
            <div dangerouslySetInnerHTML={{ __html: html }} />            
            <style jsx>{`${css}}`}</style>
        </div>
    );
};

export default BootCodeComponent