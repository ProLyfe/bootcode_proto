const BootCodeComponent = ({ bootcode }) => {

    // const { name, html, css } = bootcode;
    const { html, css, js } = bootcode;
    
    // js && eval(js);

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: html }} />            
            <style jsx>{`${css}}`}</style>
            {js && eval(js)}
        </div>
    );
};

export default BootCodeComponent